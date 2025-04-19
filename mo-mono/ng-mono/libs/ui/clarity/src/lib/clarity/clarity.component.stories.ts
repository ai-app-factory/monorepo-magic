import type { Meta, StoryObj } from '@storybook/angular';
import { ClarityComponent } from './clarity.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ClarityComponent> = {
  component: ClarityComponent,
  title: 'ClarityComponent',
};
export default meta;
type Story = StoryObj<ClarityComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/clarity works!/gi)).toBeTruthy();
  },
};
