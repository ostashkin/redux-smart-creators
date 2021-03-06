import { getPayloadInjector } from './getPayloadInjector';
import { ExtendableBasicActionCreator, InjectPayload } from '../types/creator';

interface WithLoad {
  <ActionType extends string>(
    basicCreator: Omit<ExtendableBasicActionCreator<ActionType>, 'load'> & {
      load?: InjectPayload<ActionType>;
    }
  ): ExtendableBasicActionCreator<ActionType>;
}

export const withLoad: WithLoad = (basicCreator) => {
  // eslint-disable-next-line no-param-reassign
  basicCreator.load = getPayloadInjector(basicCreator.type);
  return basicCreator as ExtendableBasicActionCreator<typeof basicCreator.type>;
};
