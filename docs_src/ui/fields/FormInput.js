// @flow

import React, { Component } from 'react';
import { DisplayError, Label, onActionWrap } from '../fields/Basic';
import { Eye } from '../icons/Eye';
import { Spinner } from '../icons/Spinner';
import type { FieldProps, iField } from '../../../src';

type AllowedTypes = 'text' | 'password';

type CommonInputProps = {|
    label?: string,
    className?: string,
    autoFocus?: boolean,
    disabled?: boolean,
    type?: AllowedTypes,
    placeholder?: string,
    pending?: boolean,
|};

type InputProps = {| ...FieldProps<string>, ...CommonInputProps |};

export class Input extends Component<InputProps, { showPassword: boolean }> {
    state = { showPassword: false };
    showPasswordToggle = () => this.setState(state => ({ showPassword: !state.showPassword }));
    type = () => (this.props.type !== 'password' ? this.props.type : this.state.showPassword ? 'text' : 'password');
    render() {
        const {
            value = '',
            label,
            error,
            required,
            className = 'form-group',
            onChange,
            onBlur,
            autoFocus,
            disabled,
            type = 'text',
            placeholder,
            pending,
        } = this.props;
        return (
            <div className={className}>
                {label && <Label {...{ label, required }} />}
                <input
                    onChange={onActionWrap(onChange)}
                    onBlur={onActionWrap(onBlur)}
                    disabled={disabled}
                    className={'form-control' + (error ? ' is-invalid' : '')}
                    type={this.type()}
                    {...{ placeholder, value, autoFocus }}
                />
                {type === 'password' && (
                    <span onClick={this.showPasswordToggle}>
                        <Eye stroked={this.state.showPassword} />
                    </span>
                )}
                {pending && <Spinner />}
                {error && <DisplayError error={error} />}
            </div>
        );
    }
}

type FormInputProps = {| Field: iField<string>, ...CommonInputProps |};

export const FormInput = ({ Field, ...rest }: FormInputProps) => (
    <Field>{fieldProps => <Input {...fieldProps} {...rest} />}</Field>
);
