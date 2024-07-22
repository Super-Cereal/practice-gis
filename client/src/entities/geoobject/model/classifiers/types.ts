export interface Classifier extends DraftClassifier {
    id: string;
}

export interface DraftClassifier {
    /** Имя классификатора */
    name?: string;

    /** Код классификатора */
    code?: string;

    /** О чем этот классификатор */
    commonInfo?: string;
}

export interface GeoObjectsClassifier {
    geoObjectId?: string;

    classifierId?: string;
}
