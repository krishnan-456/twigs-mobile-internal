const show = jest.fn();
const hide = jest.fn();

const Toast = jest.fn((_props: Record<string, unknown>) => null);

const MockToast = Object.assign(Toast, { show, hide });

export default MockToast;
