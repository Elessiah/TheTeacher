import {User} from "discord.js";
import {readFile, writeFile} from "fs/promises";

let env: Env | null = null;

async function getEnvInstance(author?: User): Promise<Env> {
    if (!env) {
        if (author) {
            env = new Env(author);
            await env.loadUsers();
        } else {
            throw Error("Missing Author to create env");
        }
    }
    return env;
}

class Env {
    public author: User;
    public usersId: string[] = [];

    constructor(author: User) {
        this.author = author;
    }

    async addUser(newId: string): Promise<boolean> {
        this.usersId.push(newId);
        return await this.saveUsers();
    }

    async rmUser(targetId: string): Promise<boolean> {
        const previousSize: number = this.usersId.length;
        this.usersId.filter((id: string) => id !== targetId);
        if (previousSize != this.usersId.length) {
            return await this.saveUsers();
        }
        return false;
    }

    isInclude(testId: string): boolean {
        return !!this.usersId.find(id => id == testId);
    }


    async loadUsers(): Promise<boolean> {
        if (!process.env.USERS_PATH) {
            await this.author.send({content: "Il manque USERS_PATH dans le .env"});
            throw new Error("No .env file provided ! Missing USERS_PATH!");
        }
        try {
            const data: string = await readFile(process.env.USERS_PATH, "utf-8");
            this.usersId = JSON.parse(data);
            return true;
        } catch (error) {
            await this.author.send({content: "Impossible de charger les utilisateurs intéressés. Erreur : " + (error as TypeError).message});
            await this.author.send({content: "Tentative de création du fichier manquant..."});
            await this.saveUsers();
            return false;
        }
    }

    async saveUsers(): Promise<boolean> {
        if (!process.env.USERS_PATH) {
            await this.author.send({content: "Il manque USERS_PATH dans le .env"});
            throw new Error("No .env file provided ! Missing USERS_PATH!");
        }
        try {
            await writeFile(process.env.USERS_PATH, JSON.stringify(this.usersId), "utf-8");
            return true;
        } catch (error) {
            await this.author.send({content: "Erreur lors de la sauvegarde des utilisateurs : " + (error as TypeError).message});
            return false;
        }
    }
}

export { Env, getEnvInstance };