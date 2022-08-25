import React from "react";
import { Story, Meta } from "@storybook/react";

import Card from "./Card";

export default {
  title: "Card",
  component: Card,
  argTypes: {},
} as Meta<typeof Card>;

const Template: Story<any> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
