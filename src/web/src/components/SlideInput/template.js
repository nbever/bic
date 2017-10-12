const template = `
<style>
  input {
    border: 0px;
    background-color: transparent;
    outline: none;
    padding: 8px;
    font-size: 18px;
    border-bottom: 1px solid lightgray;
    transition: 200ms;
    margin-top: 24px;
  }

  input:focus {
    background-color: white;
    border-bottom: 0px;
  }

  .undertow {
    border-bottom: 4px solid red;
    width: 0px;
    transition: 250ms;
  }

  .undertow.on {
    width: 100%;
  }

  .top {
    color: darkgray;
    position: absolute;
    top: 32px;
    left: 8px;
    font-size: 18px;
    pointer-events: none;
    transition: 200ms;
  }

  .top.on {
    top: 12px;
    font-size: 12px;
  }
</style>
<div style="position: relative;">
  <div class="top">{{placeholder}}</div>
  <input />
  <div class="undertow"></div>
</div>
`

export default template;
