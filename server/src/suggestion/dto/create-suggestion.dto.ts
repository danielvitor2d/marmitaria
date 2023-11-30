export interface CreateSuggestionDto {
  type: 'create' | 'update' | 'delete';
  model: 'rest' | 'meal';
  data: object;
}
