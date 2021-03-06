import { MOCKED_TYPE } from '../mocks';
import { ExtendableAsyncActionCreator } from '../../src/types/asyncCreator';

interface AsyncActionCreatorWrongUsageTests {
  <ActionType extends string, ActionCreator extends ExtendableAsyncActionCreator<ActionType>>(
    getCreator: (actionType: ActionType) => ActionCreator
  ): void;
  <
    ActionType extends string,
    Steps extends string,
    ActionCreator extends ExtendableAsyncActionCreator<ActionType, Steps>
  >(
    getCreator: (actionType: ActionType, steps?: Steps[]) => ActionCreator
  ): void;
}

// noinspection DuplicatedCode
export const wrongUsageTests: AsyncActionCreatorWrongUsageTests = <
  ActionType extends string,
  Steps extends string,
  DefaultActionCreator extends ExtendableAsyncActionCreator<ActionType>,
  ActionCreator extends ExtendableAsyncActionCreator<ActionType, Steps>
>(
  getCreator: (actionType: ActionType, steps?: Steps[]) => ActionCreator | DefaultActionCreator
): void => {
  it('should throw an Error if called without argument', () => {
    expect(() => {
      // @ts-ignore
      getCreator();
    }).toThrowError();
  });

  it('should throw an Error if called with empty string', () => {
    expect(() => {
      // @ts-ignore
      getCreator('');
    }).toThrowError();
  });

  it('should throw an Error if called with many spaces', () => {
    const actionType = ' '.repeat(Math.trunc(Math.random() * 100));
    expect(() => {
      // @ts-ignore
      getCreator(actionType);
    }).toThrowError();
  });

  it('should throw an Error if called without string', () => {
    const wrongTypes = [10, false, null, {}, [], () => {}];
    wrongTypes.forEach((type) => {
      expect(() => {
        // @ts-ignore
        getCreator(type);
      }).toThrowError();
    });
  });

  it('should throw an Error if called with wrong "steps" parameter', () => {
    const wrongSteps = [
      [],
      ['', '   ', '       '],
      [{}],
      [10],
      [null],
      [undefined],
      [true],
      [[]],
      [Symbol],
      Symbol(1),
      10,
      '',
      '   ',
      'stepName',
      null,
      true,
      {},
    ];

    wrongSteps.forEach((steps) => {
      expect(() => {
        // @ts-ignore
        getCreator(MOCKED_TYPE, steps);
      }).toThrowError();
    });
  });
};
