export interface Player {
    _id?: string;
    username: string;
    skillLevel?: string;
}

export interface TeamResponse
{
    teamA: Player[];
    teamB: Player[];
}

export interface GenerateTeamsResponse
{
    message: string;
    teams: TeamResponse;
}