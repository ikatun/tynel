import axios from 'axios';
import vm from 'vm';

export async function domainToPort(subdomain: string): Promise<string> {
  const { data } = await axios.get<string>('https://tunnel.technobabble.hr/compute-hash.js');
  const hashImplModified = data.replace('export default', 'module.exports =');

  const script = new vm.Script(hashImplModified);

  const context = vm.createContext({
    require,
    module: { exports: {} },
  });

  script.runInContext(context);

  const { compute_hash } = context.module.exports;

  return compute_hash({ variables: { subdomain } });
}
