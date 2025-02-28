import { Home, LayoutTemplate, Settings2, Trash2Icon } from "lucide-react";

export const data = {
  user: {
    name: "sumit",
    email: "ab@gmail.com",
    avatar: "shadcn/prism.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash2Icon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
};
