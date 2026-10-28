// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GenericIcon } from './GenericIcon';

describe('GenericIcon', () => {
    it('shows the first letter of the name in uppercase', () => {
        render(<GenericIcon name="github" />);

        expect(screen.getByText('G')).toBeInTheDocument();
    });

    it.each([null, ''])('shows a question mark when the name is %j', (name) => {
        render(<GenericIcon name={name} />);

        expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('matches the saved snapshot of a large round icon', () => {
        const { asFragment } = render(<GenericIcon name="github" size="large" radius="round" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
