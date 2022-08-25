import React from "react";
import { Story, Meta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {},
} as Meta<typeof Button>;

const Template: Story<any> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
