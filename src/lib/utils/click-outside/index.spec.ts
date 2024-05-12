import { render, screen } from "@testing-library/svelte";
import ClickOutsideDummy from "./ClickOutsideDummy.svelte";

it("Checks that the hidden text isn't displayed on mount", () => {
    render(ClickOutsideDummy, { props: { clicked: false } });

    const actual = screen.queryByText(/I've been clicked/g) !== null;

    expect(actual).toBeFalsy();
});

it("Checks that clicking on the component doesn't do anything", () => {
    const res = render(ClickOutsideDummy, { props: { clicked: false } });

    (res.container.querySelector("#button") as HTMLButtonElement).click();

    const actual = screen.queryByText(/I've been clicked/g) !== null;

    expect(actual).toBeFalsy();
});

/* it("Checks that clicking outside a component displays the hidden text", () => {
    const res = render(ClickOutsideDummy, { props: { clicked: false } });

    res.container.querySelector("#other-element")!.click();

    const actual = screen.queryByText(/I've been clicked/g) !== null;

    expect(actual).toBeTruthy();
}); */
