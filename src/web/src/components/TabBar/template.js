const template = `
  <style>
    .tab-bar-container {
      display: flex;
      background-color: #cccccc;
    }

    ::slotted(a) {
      padding: 8px;
      cursor: pointer;
    }

    ::slotted(a.selected) {
      background-color: {{ accentColor }} !important;
    }
  </style>
  <div class="tab-bar-container">
    <slot />
  </div>
`;

export default template;
