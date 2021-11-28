import { ParsedTask, Parser } from '.';
import { parseJson, parseJsonStrict } from '../utils';

const CTFDParser: Parser = {
  name: 'CTFd parser',
  hint: 'paste json from /api/v1/challenges. For more Information see https://docs.ctfd.io/docs/api/Swagger%20UI',

  parse(s: string): ParsedTask[] {
    const tasks = [];
    const data =
      parseJsonStrict<{ data: { name: string; category: string }[] }>(s);
    if (!Array.isArray(data?.data)) {
      return [];
    }
    for (const task of data.data) {
      if (!task.name || !task.category) {
        continue;
      }
      tasks.push({ title: task.name, category: task.category });
    }
    return tasks;
  },
  isValid(s) {
    const data = parseJson<{ data?: unknown }>(s);
    return Array.isArray(data?.data);
  },
};

export default CTFDParser;
