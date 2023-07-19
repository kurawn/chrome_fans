export enum selectors {
  /**
   * Форма набора сообщения.
   * Включает поле в том числе, а также кнопки медиа, донат, гиф.
   * Сюда же встраиваем кнопки с подсказками о типе генерируемого сообщения.
   */
  messageForm = "#make_post_form",
  /**
   * Оберка поля ввода
   */
  messageInputParent = ".v-text-field__slot",
  /**
   * Непосредственно поле ввода
   */
  messageInput = "#new_post_text_input",
  /**
   * Лоадер на поле ввода
   */
  messageInputLoader = '.v-text-field__slot .g-icon',
  /**
   * Сообщение из чата
   */
  messageItem = '[at-attr="chat_message"]',
  /**
   * Текст сообщения из чата
   */
  messageItemText = '[at-attr="message_text"]',
  /**
   * Ссылка на собеседника на экране чата
   */
  fanUsernameLink = ".b-chat__header__title .g-user-realname__wrapper",
  /**
   * Панель с кнопками-подсказками, встраиваемая данным расширением
   */
  cbPromptButtonsPanel = ".cb-prompt-buttons-panel",
}
