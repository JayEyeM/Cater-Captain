# Cater-Captain

Cater-Captain is my Module 2 project of the Get Coding program. It is a catering business management web app which currently uses local storage.

## Event Management Page:

The user can add and manage events.
Each Event is displayed as a card, where you can expand for more details, and access the edit, delete or Tool Kit buttons.
Each event has its own "Tool Kit", where the user can add items from their inventory and specialty ingredients. Each event can be assigned its own menu, and notes can be added as well.
There is also a pricing tool in the Tool Kit, which automatically takes into account any items added from inventory and/or
specialty ingredients. The user can then add custom pricing items. The total will be calaculated, and from there a discount and tax percentage can be added to be calculated into the final event price.
There are a few options for filtering through your saved events: - Buttons for quick filtering according to their labels. (example: "next week") - Find saved events that fall between two dates entered by the user. - Search for saved events by customer first and/or last name.

"DayJS" was used for much of the filtering logic.

NOTE:
One of the next things I plan to add to the Event Tool Kit is a tool that enables the user to assign employees from their saved employees list to each event, along with an optional input field next to each assigned employee, so the user can write each employee's assigned tasks for that event.

## Inventory Management Page:

Add your inventory items. Fill out the form, where you can also assign a supplier from your list of saved suppliers to each inventory item. As well, you can set a re-order quantity to each item. So, if the on-hand qunatity falls below the
re-order quantity, that particular inventory item will be outlined in red, to indicate its time to re-order that item.
Each item is displayed as a card, where you can expand for more details, much like the Event Cards.
Organize the inventory how you like by dragging a dropping anywhere within the list, thanks to the use of "Beautiful DND".

## Supplier/Employee Management Pages:

Suppliers and Employees both operate in a similar manner. Fill out the form and add the supplier/employee. Of course, the form details will be slightly different for supplier vs employes. Once the form is filled out, you will see the supplier/employee added as a supplier/employee card in the list below.

## Dashboard Page:

Currently on the Dashboard page, the user can view their upcoming events for the next 14 days. They can also see a list of all inventory items that need to be re-ordered, and check them off once they are ordered. There is also a scetion where the user can view data tables of events, inventory, employees, suppliers, with the ability to export as csv or json.

### The above pages are accesible once the user has signed in.

## Learning Page:

There is also a Learning page which contains videos for users to get up to speed on how to use the Cater-Captain app. This is accessible when signed out or signed in.

## Homepage:

You will find a quick overview of the key points of what Cater-Captain is and how it can help manage a catering business.

## About Page:

You can read a bit more about me and the project on the about page.

## Login/Sign-up/Sign-out:

Supabase was used for user authentication processes.

## Shout-out:

Gratitude is to be extended to my mentor, Eti-abasi Umobong. He has practiced patience and shown guidance throughout the course of this project. Wrapping my head around how React works (although still a long way to go) was a task made easier with his help. As well as planning next steps to stay on track.

---

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
