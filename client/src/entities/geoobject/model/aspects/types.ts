export interface AssignedAspect extends DraftAspect {
    id: string;

    /** Связь с обьектом */
    geographicalObjectId: string | null;

    /**
     * Описание обьекта с точки зрения этого аспекта
     * ИЛИ
     * URL за инфой об аспекте
     */
    endPoint: string;
}

export interface DraftAspect {
    /** Код аспекта */
    code: string;

    /** Имя аспекта */
    type: string;

    /** Описание аспекта */
    commonInfo: string;
}
