export class MentorSignUpInfo {
    name: string;
    username: string;
    linkedin: string;
    role: string[];
    password: string;
    yearsExp: number;
    startTime: number;
    endTime: number;
    fee: number;
    skills: string[];

    constructor(name: string, username: string, linkedin: string, password: string, yearsexp: number, starttime: number, endtime: number, fee: number, skills: string[]) {
        this.name = name;
        this.username = username;
        this.linkedin = linkedin;
        this.password = password;
        this.skills = skills;
        this.yearsExp = yearsexp;
        this.startTime = starttime;
        this.endTime = endtime;
        this.fee = fee;
        this.role = ['mentor'];
    }
}
