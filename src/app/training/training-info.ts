export class TrainingInfo {
    userId: number;
    mentorId: number;
    skillId: number;

    constructor(userId: number, mentorId: number, skillId: number) {
        this.userId = userId;
        this.mentorId = mentorId;
        this.skillId = skillId;
    }
}
