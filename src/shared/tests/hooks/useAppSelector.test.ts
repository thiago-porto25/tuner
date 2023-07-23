// useAppSelector.test.ts
import { useSelector } from 'react-redux';

import useAppSelector from '@/shared/hooks/useAppSelector';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('useAppSelector', () => {
  const mockedUseSelector = useSelector as jest.MockedFunction<
    typeof useSelector
  >;
  const selectFnMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call useSelector', () => {
    useAppSelector(selectFnMock);

    expect(mockedUseSelector).toHaveBeenCalledTimes(1);
    expect(mockedUseSelector).toHaveBeenCalledWith(selectFnMock);
  });

  it('should return the result of useSelector', () => {
    const stateValueSelected = 'variable';
    mockedUseSelector.mockReturnValueOnce(stateValueSelected);

    const result = useAppSelector(selectFnMock);

    expect(result).toBe(stateValueSelected);
  });
});
