import React from "react";
import { Story, Meta } from "@storybook/react";

import TextInput from "./TextInput";

export default {
  title: "TextInput",
  component: TextInput,
  argTypes: {},
} as Meta<typeof TextInput>;

const Template: Story<any> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
