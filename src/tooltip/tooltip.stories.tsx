import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Tooltip } from './tooltip';
import { Button } from '../button';
import { Text } from '../text';
import type { TooltipProps } from './types';

const TooltipDemo = (args: TooltipProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <Tooltip {...args}>
        <Button size="md" variant="outline">
          Hover me
        </Button>
      </Tooltip>
    </View>
  );
};

const ControlledDemo = (args: TooltipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <Tooltip {...args} open={open} onOpenChange={setOpen}>
        <Button size="md" variant="outline">
          Controlled
        </Button>
      </Tooltip>
    </View>
  );
};

const AllPlacementsDemo = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 40, padding: 80 }}>
      <Tooltip content="Top tooltip" side="top">
        <Button size="sm" variant="outline">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button size="sm" variant="outline">
          Bottom
        </Button>
      </Tooltip>
      <View style={{ flexDirection: 'row', gap: 60 }}>
        <Tooltip content="Left tooltip" side="left">
          <Button size="sm" variant="outline">
            Left
          </Button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <Button size="sm" variant="outline">
            Right
          </Button>
        </Tooltip>
      </View>
    </View>
  );
};

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Placement side',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment along the side axis',
    },
    hasArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow pointer',
    },
    sideOffset: {
      control: 'number',
      description: 'Distance between tooltip and trigger',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Auto-dismiss duration in ms (0 = no auto-dismiss)',
    },
    triggerAction: {
      control: 'select',
      options: ['press', 'longPress'],
      description: 'Trigger interaction type',
    },
  },
  args: {
    content: 'Tooltip message will show up here',
    size: 'sm',
    side: 'top',
    align: 'center',
    hasArrow: true,
    sideOffset: 6,
    autoHideDuration: 0,
    triggerAction: 'press',
  },
} satisfies Meta<TooltipProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <TooltipDemo {...args} />,
};

export const Small: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    size: 'sm',
    content: 'Small tooltip',
  },
};

export const Medium: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    size: 'md',
    content: 'Medium tooltip with more content',
  },
};

export const Large: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    size: 'lg',
    content: 'Large tooltip with even more detailed content for the user',
  },
};

export const BottomPlacement: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    side: 'bottom',
    content: 'Bottom placement',
  },
};

export const LeftPlacement: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    side: 'left',
    content: 'Left placement',
  },
};

export const RightPlacement: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    side: 'right',
    content: 'Right placement',
  },
};

export const NoArrow: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    hasArrow: false,
    content: 'Tooltip without arrow',
  },
};

export const AutoHide: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    autoHideDuration: 3000,
    content: 'I disappear after 3 seconds',
  },
};

export const LongPress: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    triggerAction: 'longPress',
    content: 'Long press triggered',
  },
};

export const Controlled: Story = {
  render: (args) => <ControlledDemo {...args} />,
  args: {
    content: 'Controlled tooltip',
  },
};

export const CustomContent: Story = {
  render: (args) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <Tooltip
        {...args}
        content={
          <View style={{ padding: 4 }}>
            <Text fontSize={14} fontWeight="700" color="#FFFFFF">
              Custom Title
            </Text>
            <Text fontSize={12} color="#FFFFFFCC">
              With rich content support
            </Text>
          </View>
        }
      >
        <Button size="md" variant="outline">
          Rich Content
        </Button>
      </Tooltip>
    </View>
  ),
};

export const AllPlacements: Story = {
  render: () => <AllPlacementsDemo />,
};
