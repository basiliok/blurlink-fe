// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
    const renderDropdown = () => {
        render(
            <Dropdown trigger={<span>Options</span>}>
                <p>Menu content</p>
            </Dropdown>,
        );
    };

    const getTrigger = () => screen.getByRole('button', { name: 'Options' });

    it('starts closed', () => {
        renderDropdown();

        expect(screen.queryByText('Menu content')).not.toBeInTheDocument();
    });

    it('opens when the trigger is clicked', async () => {
        const user = userEvent.setup();
        renderDropdown();

        await user.click(getTrigger());

        expect(screen.getByText('Menu content')).toBeInTheDocument();
    });

    it('closes when the trigger is clicked again', async () => {
        const user = userEvent.setup();
        renderDropdown();
        await user.click(getTrigger());

        await user.click(getTrigger());

        expect(screen.queryByText('Menu content')).not.toBeInTheDocument();
    });

    it('closes when the user clicks outside', async () => {
        const user = userEvent.setup();
        renderDropdown();
        await user.click(getTrigger());

        // Clicks the body itself, not something inside it, so the click lands outside the dropdown.
        await user.click(document.body);

        expect(screen.queryByText('Menu content')).not.toBeInTheDocument();
    });

    it('stays open when the user clicks inside the menu', async () => {
        const user = userEvent.setup();
        renderDropdown();
        await user.click(getTrigger());

        await user.click(screen.getByText('Menu content'));

        expect(screen.getByText('Menu content')).toBeInTheDocument();
    });

    it('closes when the content calls the close function it receives', async () => {
        const user = userEvent.setup();
        render(
            <Dropdown trigger={<span>Options</span>}>
                {(close) => (
                    <button type="button" onClick={close}>
                        New group
                    </button>
                )}
            </Dropdown>,
        );
        await user.click(getTrigger());

        await user.click(screen.getByRole('button', { name: 'New group' }));

        expect(screen.queryByRole('button', { name: 'New group' })).not.toBeInTheDocument();
    });
});
