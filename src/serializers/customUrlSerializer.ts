import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
  parse(url: any): UrlTree {
    let dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): any {
    let dus = new DefaultUrlSerializer(),
      path = dus.serialize(tree);
    path = path.replace(/%3D/g, '=');
    path = path.replace(/%26/g, '&');
    // use your regex to replace as per your requirement.
    return path;
  }
}
