import type { Meta, StoryObj } from '@storybook/angular';
import { AutoCompleteComponent } from './auto-complete.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AutoCompleteComponent> = {
  component: AutoCompleteComponent,
  title: 'AutoCompleteComponent',
};
export default meta;
type Story = StoryObj<AutoCompleteComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/auto-complete works!/gi)).toBeTruthy();
  },
};
