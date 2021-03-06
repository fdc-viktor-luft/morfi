/**
 * This file is part of morfi which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import type { FormValidation, FormData } from '../src/';
import { Validators } from '../docs_src/ui/validators/validators';

type MyFormValues = {| name: string, age: number, size: number, nickname?: string, email: string |};

export const formValidation: FormValidation<MyFormValues> = {
    name: { onChange: Validators.string({ min: 2, max: 10 }) },
    age: { onChange: Validators.number({ minLength: 1, maxLength: 3 }) },
    nickname: { onBlur: Validators.string({ min: 5, max: 5 }) },
    email: { onSubmit: Validators.email },
};
export const formData: FormData<MyFormValues> = {
    values: {
        name: 'Kenny',
        age: 81,
        size: 170,
        nickname: 'KeNNy',
        email: 'kenny@testweb.de',
    },
    errors: {},
};
export const invalidFormData: FormData<MyFormValues> = {
    values: {
        name: 'Kenny - The King',
        age: 9999,
        size: 170,
        email: '',
    },
    errors: { size: { id: 'validation.value.incompatible' } },
};
