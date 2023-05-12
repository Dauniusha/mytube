import { SortingDirections } from "@mytube/core/interfaces/sorting-directions.interface";

export interface VideoFilter {
    sortings: {
        views?: SortingDirections;
        uploadedDate?: SortingDirections;
    },
    channel?: string;
    sentance?: string;
}
