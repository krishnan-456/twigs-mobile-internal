import { colorOpacity, resolveMargin, resolvePadding } from '../utils';

describe('colorOpacity', () => {
  it('applies 10% opacity to a 6-digit hex color', () => {
    expect(colorOpacity('#00828D', 0.1)).toBe('#00828D1A');
  });

  it('applies 80% opacity', () => {
    expect(colorOpacity('#64748B', 0.8)).toBe('#64748BCC');
  });

  it('applies 0% opacity (fully transparent)', () => {
    expect(colorOpacity('#FF0000', 0)).toBe('#FF000000');
  });

  it('applies 100% opacity (fully opaque)', () => {
    expect(colorOpacity('#FF0000', 1)).toBe('#FF0000FF');
  });

  it('applies 5% opacity', () => {
    expect(colorOpacity('#E75030', 0.05)).toBe('#E750300D');
  });

  it('applies 40% opacity', () => {
    expect(colorOpacity('#00828D', 0.4)).toBe('#00828D66');
  });

  it('strips existing alpha from 8-digit hex before applying new opacity', () => {
    expect(colorOpacity('#00828DFF', 0.5)).toBe('#00828D80');
  });

  it('handles 3-digit shorthand hex', () => {
    expect(colorOpacity('#F00', 0.5)).toBe('#FF000080');
  });

  it('clamps opacity below 0 to 0', () => {
    expect(colorOpacity('#000000', -0.5)).toBe('#00000000');
  });

  it('clamps opacity above 1 to 1', () => {
    expect(colorOpacity('#000000', 1.5)).toBe('#000000FF');
  });
});

describe('resolveMargin', () => {
  it('returns default spacing when no props given', () => {
    expect(resolveMargin({})).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
  });

  it('resolves individual margins', () => {
    expect(resolveMargin({ marginTop: 10, marginLeft: 5 })).toEqual({
      top: 10,
      bottom: 0,
      left: 5,
      right: 0,
    });
  });

  it('horizontal/vertical take precedence over margin', () => {
    expect(resolveMargin({ margin: 4, marginVertical: 8 })).toEqual({
      top: 8,
      bottom: 8,
      left: 4,
      right: 4,
    });
  });

  it('individual takes precedence over horizontal/vertical', () => {
    expect(resolveMargin({ marginVertical: 8, marginTop: 12 })).toEqual({
      top: 12,
      bottom: 8,
      left: 0,
      right: 0,
    });
  });
});

describe('resolvePadding', () => {
  it('returns default spacing when no props given', () => {
    expect(resolvePadding({})).toEqual({ top: 0, bottom: 0, left: 0, right: 0 });
  });

  it('resolves individual paddings', () => {
    expect(resolvePadding({ paddingBottom: 16, paddingRight: 8 })).toEqual({
      top: 0,
      bottom: 16,
      left: 0,
      right: 8,
    });
  });
});
