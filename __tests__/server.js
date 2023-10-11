describe('#testing tests', () => {
  it('adds 2', () => {
    const add2 = (num) => num + 2;
    const result = add2(2);
    expect(result).toBe(4);
  });
});
