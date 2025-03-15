export enum SkillLevel {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced",
  }
  
  export interface User {
    _id: string;
    username: string;
    // skillLevel?: SkillLevel;
    skillLevel?: string;
    email: string;
    profile_img: string;
  }

