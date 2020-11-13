import Handlebars from 'handlebars';
import { resolve, isAbsolute } from 'path';
import { readFile } from './fs-async';
import { resolve, isAbsolute } from 'path';
import { AssetType } from '../types/misc';

const TEMPLATES_PATH = '../../templates';

type BuiltinHelperName =
  | 'helperMissing'
  | 'blockHelperMissing'
  | 'each'
  | 'if'
  | 'unless'
  | 'with'
  | 'log'
  | 'lookup';

type CustomHelperName = string;

export const renderTemplate = async (
  templatePath: string,
  context: object,
  options?: CompileOptions
) => {
  const absoluteTemplatePath = isAbsolute(templatePath)
    ? templatePath
    : resolve(process.cwd(), templatePath);
  const template = await readFile(absoluteTemplatePath, 'utf8');

type KnownHelpers = {
  [name in BuiltinHelperName | CustomHelperName]: boolean;
};

export interface CompileOptions {
  data?: boolean;
  compat?: boolean;
  knownHelpers?: KnownHelpers;
  knownHelpersOnly?: boolean;
  noEscape?: boolean;
  strict?: boolean;
  assumeObjects?: boolean;
  preventIndent?: boolean;
  ignoreStandalone?: boolean;
  explicitPartialContext?: boolean;
  helpers?: {
    contentSelector?: (key: string) => string;
    codepoint?: (hexNumber: number) => string;
    foo?: () => string;
  };
}

export const renderTemplate = async ({
  path,
  context: { selector, tag, ...context },
  compilerOptions
}: {
  path: string;
  context: Record<string, any>;
  compilerOptions?: CompileOptions;
}) => {
  const absoluteTemplatePath = isAbsolute(templatePath)
    ? templatePath
    : resolve(process.cwd(), templatePath);
  const template = await readFile(absoluteTemplatePath, 'utf8');
  const template = await readFile(path, 'utf8');
  return Handlebars.compile(template)(
    { baseName: selector || tag, selector, tag, ...context },
    compilerOptions
  );
};

export const getDefaultTemplatePath = (assetType: AssetType) =>
  resolve(__dirname, TEMPLATES_PATH, `${assetType}.hbs`);
