import yargs from 'yargs';
import { mainAsync } from './main';

const argv = yargs
    .option('init', {
        alias: 'i',
        description: 'Tell the tool init flow from number of input',
        type: 'number'
    })
    .option('reset', {
        alias: 'r',
        description:
            'Tell the tool reset flow before starting (to cancel all dispatch requests and localize all robots)',
        type: 'boolean'
    })
    .help()
    .alias('help', 'h').argv;
mainAsync(argv);
