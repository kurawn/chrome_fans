import { ButtonT } from "../background/ChatterboxClient/ChatterboxClient";
import { urls } from "../utils/urls";

type Props = {
  buttons: ButtonT[];
  onButtonClick: (type: string) => Promise<void>;
  isAuthorized: boolean;
};

export const PromptButtonsPanel = ({
  buttons,
  onButtonClick,
  isAuthorized,
}: Props): HTMLDivElement => {
  const container = document.createElement("div");

  const authContent = `
    ${buttons
      .map(
        ({ text, type }) =>
          `<button class="cb-button_secondary" data-type="${type}">${text}</button>`
      )
      .join("")}
    <a href="${
      urls.external.CHATTERBOX
    }" class="cb-hint cb-promo-hint" target="_blank" rel="noopener noreferrer">by chatterbox.one</a>`;

  const notAuthContent = `<a href="${urls.external.ACCOUNT_MY}" class="cb-hint" target="_blank" rel="noopener noreferrer">Войти в chatterbox.one</a>`;

  container.innerHTML = `
    <div class="cb-prompt-buttons-panel">
       ${isAuthorized ? authContent : notAuthContent}
    </div>
    `;

  const buttonElements = [
    ...container.querySelectorAll<HTMLButtonElement>("button[data-type]"),
  ];

  buttonElements.forEach((btn) =>
    btn.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();

      const { currentTarget } = event;
      if (!currentTarget) {
        return;
      }

      const { type } = (currentTarget as HTMLButtonElement).dataset;

      if (!type) {
        return;
      }

      onButtonClick(type);
    })
  );

  return container.querySelector<HTMLDivElement>("div")!;
};
