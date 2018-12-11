module.exports = function getGrid(serial) {
  return Array.from(
    {
      length: 300,
    },
    (_, x) => Int8Array.from(
      {
        length: 300,
      },
      (__, y) => {
        const rackId = x + 10;
        let powerLevel = rackId * y + serial;
        powerLevel *= rackId;
        return (powerLevel % 1000 / 100 | 0) - 5;
      },
    ),
  );
};
