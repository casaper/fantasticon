import { FontGenerator } from '../../types/generator';
import { FontAssetType } from '../../types/misc';
import { renderTemplate } from '../../utils/template';
import { renderSrcAttribute } from '../../utils/css';
import { TEMPLATE_PATHS } from '../../constants';
import { buildHelpers, buildMainSelector } from '../../utils/scss';

const generator: FontGenerator<Buffer> = {
  dependsOn: FontAssetType.SVG,

  generate: (
    { customTemplate, selector, tag, prefix, ...options },
    svg: Buffer
  ) => {
    const fontSrc = renderSrcAttribute(options, svg);
    return renderTemplate({
      path: customTemplate?.css || TEMPLATE_PATHS.css,
      context: {
        fontSrc,
        ...buildMainSelector({
          name: options.name,
          selector,
          tag,
          prefix
        }),
        ...options
      },
      compilerOptions: {
        helpers: buildHelpers({
          selector,
          tag,
          prefix
        })
      }
    });
  }
};

export default generator;
