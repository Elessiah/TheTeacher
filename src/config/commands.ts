import {becomeStudent} from "@/env/commandHandlers/becomeStudent";
import {leaveTheTeacher} from "@/env/commandHandlers/leaveTheTeacher";

const commands = {
    "become-student": {
        handler: becomeStudent,
        parameters: {
            description: "The Teacher will send you the correction of your messages",
        }
    },
    "leave-the-teacher": {
        handler: leaveTheTeacher,
        parameters: {
            description: "The Teacher will stop sending you the correction of your messages",
        }
    }
}

export { commands };