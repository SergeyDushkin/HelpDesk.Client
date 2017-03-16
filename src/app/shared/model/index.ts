export interface IIdentifiable {
    id: string;
}

export interface IDependently {
    referenceId: string;
}

export interface IHasDisplayName {
    displayName: string;
}

export interface NoParamConstructor<T> {
    new (): T;
}
