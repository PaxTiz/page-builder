import { ZodSchema } from 'zod';
import { Block } from '~/types';

export const useBlockValidation = <T extends Block>(validator: ZodSchema) => {
  type Keys = Omit<T, 'id' | 'type' | 'children'>;
  type Errors = Map<keyof Keys, string>;

  const errors: Ref<Errors> = useState('block_validation', () => new Map());

  const error = (key: keyof Keys) => {
    return errors.value.get(key);
  };

  const reset = () => {
    errors.value = new Map();
  };

  const validate = <T>(object: Block) => {
    reset();

    const response = validator.safeParse(object);
    if (response.success) {
      return {
        id: object.id,
        type: object.type,
        name: object.name,
        ...response.data,
      } as T;
    }

    response.error.errors.forEach((issue) => {
      errors.value.set(issue.path[0]! as keyof Keys, issue.message);
    });

    return false;
  };

  return { error, reset, validate };
};
