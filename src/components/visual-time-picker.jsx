import React, { useState } from 'react';

const VisualTimePicker = () => {
  const [isQuarterMode, setIsQuarterMode] = useState(true);
  const QUARTERS = isQuarterMode ? ['00', '15', '30', '45'] : ['00'];
  const HOURS = 24;
  const helperArr = Array(HOURS).fill(0);
  const timeStamps = helperArr.map((h, index) =>
    QUARTERS.map((q) => {
      const obj = {
        timeStr: index + ':' + q,
        isSelected: false,
      };
      return obj;
    })
  );
  let returnArr = [];

  const handleSelect = (value, timeIndex, quartersIndex) => {
    timeStamps[timeIndex][quartersIndex].isSelected = value;
    returnArr = timeStamps
      .map((v) => v.filter((q) => q.isSelected).map((t) => t.timeStr))
      .map((str) => str);

    console.log(
      [].concat(...returnArr.map((element) => [].concat(...element)))
    );
  };

  return (
    <>
      <div style={{ display: 'block' }}>
        <label htmlFor=''>
          {' '}
          {isQuarterMode
            ? 'Wyłącz edycję kwadransów'
            : 'Włącz edycję kwadransów'}{' '}
        </label>
        <input
          type='checkbox'
          onChange={() => setIsQuarterMode((prevState) => !prevState)}
        />
      </div>
      {timeStamps.map((t, index) => {
        return (
          <div
            key={'square_' + index}
            style={{
              backgroundColor: 'white',
              border: 'solid 1px',
              margin: '1px',
              display: 'inline-block',
            }}
          >
            <div style={{ display: 'block', textAlign: 'center' }}>
              {' '}
              {index}
            </div>

            {t.map((quarter, quartersIndex) => {
              return (
                <div
                  key={'nested_square_' + index + '_' + quartersIndex}
                  style={{ display: 'inline-block' }}
                >
                  <div
                    style={{
                      color: 'grey',
                      fontSize: '10px',
                      margin: 0,
                    }}
                  >
                    {' '}
                    {isQuarterMode && quarter.timeStr.slice(-2)}{' '}
                  </div>
                  <div
                    style={{
                      height: '20px',
                    }}
                  >
                    <input
                      type={'checkbox'}
                      style={{
                        appearance: 'none',
                        height: '20px',
                        border: 'solid 1px',
                      }}
                      value={quarter.isSelected}
                      onChange={(event) =>
                        handleSelect(event.target.checked, index, quartersIndex)
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default VisualTimePicker;
