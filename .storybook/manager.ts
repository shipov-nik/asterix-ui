import { addons, types } from "storybook/manager-api";
import { themes } from "./theme";

addons.setConfig({
  theme: themes.light,
});

const ADDON_ID = "st-theme-addon";
const TOOL_ID = `${ADDON_ID}tool`;

addons.register(ADDON_ID, (api) => {
  // Listen to theme changes via channel
  const channel = api.getChannel();
  if (channel) {
    channel.on("updateGlobals", (data: any) => {
      const globals = data?.globals;
      if (globals?.theme && themes[globals.theme]) {
        api.setOptions({ theme: themes[globals.theme] });
      }
    });
  }

  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Theme",
    render: () => null,
  });
});
