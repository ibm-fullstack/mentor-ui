export class SearchInfo {
    skill: string;
    startTime: number;
    endTime: number;

    constructor(skill: string, startTime: number, endTime: number) {
        this.skill = skill;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
