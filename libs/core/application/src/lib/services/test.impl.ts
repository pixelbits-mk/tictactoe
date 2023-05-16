import 'reflect-metadata'

import { injectable } from "inversify";
import { Test } from "../interfaces/test";

@injectable()
export class TestImpl implements Test {

}