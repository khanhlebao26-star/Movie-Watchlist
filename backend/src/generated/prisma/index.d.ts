
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Movie
 * 
 */
export type Movie = $Result.DefaultSelection<Prisma.$MoviePayload>
/**
 * Model WatchListItem
 * 
 */
export type WatchListItem = $Result.DefaultSelection<Prisma.$WatchListItemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const WatchListStatus: {
  PLANNED: 'PLANNED',
  WATCHING: 'WATCHING',
  COMPLETED: 'COMPLETED',
  DROPPED: 'DROPPED'
};

export type WatchListStatus = (typeof WatchListStatus)[keyof typeof WatchListStatus]

}

export type WatchListStatus = $Enums.WatchListStatus

export const WatchListStatus: typeof $Enums.WatchListStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movie`: Exposes CRUD operations for the **Movie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movies
    * const movies = await prisma.movie.findMany()
    * ```
    */
  get movie(): Prisma.MovieDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watchListItem`: Exposes CRUD operations for the **WatchListItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WatchListItems
    * const watchListItems = await prisma.watchListItem.findMany()
    * ```
    */
  get watchListItem(): Prisma.WatchListItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Movie: 'Movie',
    WatchListItem: 'WatchListItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "movie" | "watchListItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Movie: {
        payload: Prisma.$MoviePayload<ExtArgs>
        fields: Prisma.MovieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findFirst: {
            args: Prisma.MovieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findMany: {
            args: Prisma.MovieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          create: {
            args: Prisma.MovieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          createMany: {
            args: Prisma.MovieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          delete: {
            args: Prisma.MovieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          update: {
            args: Prisma.MovieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          deleteMany: {
            args: Prisma.MovieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovieUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          upsert: {
            args: Prisma.MovieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          aggregate: {
            args: Prisma.MovieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovie>
          }
          groupBy: {
            args: Prisma.MovieGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovieGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovieCountArgs<ExtArgs>
            result: $Utils.Optional<MovieCountAggregateOutputType> | number
          }
        }
      }
      WatchListItem: {
        payload: Prisma.$WatchListItemPayload<ExtArgs>
        fields: Prisma.WatchListItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchListItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchListItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>
          }
          findFirst: {
            args: Prisma.WatchListItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchListItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>
          }
          findMany: {
            args: Prisma.WatchListItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>[]
          }
          create: {
            args: Prisma.WatchListItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>
          }
          createMany: {
            args: Prisma.WatchListItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchListItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>[]
          }
          delete: {
            args: Prisma.WatchListItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>
          }
          update: {
            args: Prisma.WatchListItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>
          }
          deleteMany: {
            args: Prisma.WatchListItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchListItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WatchListItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>[]
          }
          upsert: {
            args: Prisma.WatchListItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchListItemPayload>
          }
          aggregate: {
            args: Prisma.WatchListItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchListItem>
          }
          groupBy: {
            args: Prisma.WatchListItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchListItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchListItemCountArgs<ExtArgs>
            result: $Utils.Optional<WatchListItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    movie?: MovieOmit
    watchListItem?: WatchListItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    movies: number
    watchListItems: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | UserCountOutputTypeCountMoviesArgs
    watchListItems?: boolean | UserCountOutputTypeCountWatchListItemsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchListItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchListItemWhereInput
  }


  /**
   * Count Type MovieCountOutputType
   */

  export type MovieCountOutputType = {
    watchListItems: number
  }

  export type MovieCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchListItems?: boolean | MovieCountOutputTypeCountWatchListItemsArgs
  }

  // Custom InputTypes
  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieCountOutputType
     */
    select?: MovieCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountWatchListItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchListItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    movies?: boolean | User$moviesArgs<ExtArgs>
    watchListItems?: boolean | User$watchListItemsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | User$moviesArgs<ExtArgs>
    watchListItems?: boolean | User$watchListItemsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      movies: Prisma.$MoviePayload<ExtArgs>[]
      watchListItems: Prisma.$WatchListItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movies<T extends User$moviesArgs<ExtArgs> = {}>(args?: Subset<T, User$moviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchListItems<T extends User$watchListItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$watchListItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.movies
   */
  export type User$moviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * User.watchListItems
   */
  export type User$watchListItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    where?: WatchListItemWhereInput
    orderBy?: WatchListItemOrderByWithRelationInput | WatchListItemOrderByWithRelationInput[]
    cursor?: WatchListItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchListItemScalarFieldEnum | WatchListItemScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Movie
   */

  export type AggregateMovie = {
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  export type MovieAvgAggregateOutputType = {
    releaseYear: number | null
    runtime: number | null
  }

  export type MovieSumAggregateOutputType = {
    releaseYear: number | null
    runtime: number | null
  }

  export type MovieMinAggregateOutputType = {
    id: string | null
    title: string | null
    overview: string | null
    releaseYear: number | null
    runtime: number | null
    posterUrl: string | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type MovieMaxAggregateOutputType = {
    id: string | null
    title: string | null
    overview: string | null
    releaseYear: number | null
    runtime: number | null
    posterUrl: string | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type MovieCountAggregateOutputType = {
    id: number
    title: number
    overview: number
    releaseYear: number
    genres: number
    runtime: number
    posterUrl: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type MovieAvgAggregateInputType = {
    releaseYear?: true
    runtime?: true
  }

  export type MovieSumAggregateInputType = {
    releaseYear?: true
    runtime?: true
  }

  export type MovieMinAggregateInputType = {
    id?: true
    title?: true
    overview?: true
    releaseYear?: true
    runtime?: true
    posterUrl?: true
    createdBy?: true
    createdAt?: true
  }

  export type MovieMaxAggregateInputType = {
    id?: true
    title?: true
    overview?: true
    releaseYear?: true
    runtime?: true
    posterUrl?: true
    createdBy?: true
    createdAt?: true
  }

  export type MovieCountAggregateInputType = {
    id?: true
    title?: true
    overview?: true
    releaseYear?: true
    genres?: true
    runtime?: true
    posterUrl?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type MovieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movie to aggregate.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movies
    **/
    _count?: true | MovieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieMaxAggregateInputType
  }

  export type GetMovieAggregateType<T extends MovieAggregateArgs> = {
        [P in keyof T & keyof AggregateMovie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovie[P]>
      : GetScalarType<T[P], AggregateMovie[P]>
  }




  export type MovieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithAggregationInput | MovieOrderByWithAggregationInput[]
    by: MovieScalarFieldEnum[] | MovieScalarFieldEnum
    having?: MovieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieCountAggregateInputType | true
    _avg?: MovieAvgAggregateInputType
    _sum?: MovieSumAggregateInputType
    _min?: MovieMinAggregateInputType
    _max?: MovieMaxAggregateInputType
  }

  export type MovieGroupByOutputType = {
    id: string
    title: string
    overview: string | null
    releaseYear: number
    genres: string[]
    runtime: number | null
    posterUrl: string | null
    createdBy: string
    createdAt: Date
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  type GetMovieGroupByPayload<T extends MovieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovieGroupByOutputType[P]>
            : GetScalarType<T[P], MovieGroupByOutputType[P]>
        }
      >
    >


  export type MovieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    overview?: boolean
    releaseYear?: boolean
    genres?: boolean
    runtime?: boolean
    posterUrl?: boolean
    createdBy?: boolean
    createdAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    watchListItems?: boolean | Movie$watchListItemsArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    overview?: boolean
    releaseYear?: boolean
    genres?: boolean
    runtime?: boolean
    posterUrl?: boolean
    createdBy?: boolean
    createdAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    overview?: boolean
    releaseYear?: boolean
    genres?: boolean
    runtime?: boolean
    posterUrl?: boolean
    createdBy?: boolean
    createdAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectScalar = {
    id?: boolean
    title?: boolean
    overview?: boolean
    releaseYear?: boolean
    genres?: boolean
    runtime?: boolean
    posterUrl?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }

  export type MovieOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "overview" | "releaseYear" | "genres" | "runtime" | "posterUrl" | "createdBy" | "createdAt", ExtArgs["result"]["movie"]>
  export type MovieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    watchListItems?: boolean | Movie$watchListItemsArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MovieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MovieIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MoviePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Movie"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      watchListItems: Prisma.$WatchListItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      overview: string | null
      releaseYear: number
      genres: string[]
      runtime: number | null
      posterUrl: string | null
      createdBy: string
      createdAt: Date
    }, ExtArgs["result"]["movie"]>
    composites: {}
  }

  type MovieGetPayload<S extends boolean | null | undefined | MovieDefaultArgs> = $Result.GetResult<Prisma.$MoviePayload, S>

  type MovieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovieFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovieCountAggregateInputType | true
    }

  export interface MovieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Movie'], meta: { name: 'Movie' } }
    /**
     * Find zero or one Movie that matches the filter.
     * @param {MovieFindUniqueArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieFindUniqueArgs>(args: SelectSubset<T, MovieFindUniqueArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movie that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovieFindUniqueOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieFindUniqueOrThrowArgs>(args: SelectSubset<T, MovieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieFindFirstArgs>(args?: SelectSubset<T, MovieFindFirstArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieFindFirstOrThrowArgs>(args?: SelectSubset<T, MovieFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movies
     * const movies = await prisma.movie.findMany()
     * 
     * // Get first 10 Movies
     * const movies = await prisma.movie.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movieWithIdOnly = await prisma.movie.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovieFindManyArgs>(args?: SelectSubset<T, MovieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movie.
     * @param {MovieCreateArgs} args - Arguments to create a Movie.
     * @example
     * // Create one Movie
     * const Movie = await prisma.movie.create({
     *   data: {
     *     // ... data to create a Movie
     *   }
     * })
     * 
     */
    create<T extends MovieCreateArgs>(args: SelectSubset<T, MovieCreateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movies.
     * @param {MovieCreateManyArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovieCreateManyArgs>(args?: SelectSubset<T, MovieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movies and returns the data saved in the database.
     * @param {MovieCreateManyAndReturnArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movies and only return the `id`
     * const movieWithIdOnly = await prisma.movie.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovieCreateManyAndReturnArgs>(args?: SelectSubset<T, MovieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movie.
     * @param {MovieDeleteArgs} args - Arguments to delete one Movie.
     * @example
     * // Delete one Movie
     * const Movie = await prisma.movie.delete({
     *   where: {
     *     // ... filter to delete one Movie
     *   }
     * })
     * 
     */
    delete<T extends MovieDeleteArgs>(args: SelectSubset<T, MovieDeleteArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movie.
     * @param {MovieUpdateArgs} args - Arguments to update one Movie.
     * @example
     * // Update one Movie
     * const movie = await prisma.movie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovieUpdateArgs>(args: SelectSubset<T, MovieUpdateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movies.
     * @param {MovieDeleteManyArgs} args - Arguments to filter Movies to delete.
     * @example
     * // Delete a few Movies
     * const { count } = await prisma.movie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovieDeleteManyArgs>(args?: SelectSubset<T, MovieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovieUpdateManyArgs>(args: SelectSubset<T, MovieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies and returns the data updated in the database.
     * @param {MovieUpdateManyAndReturnArgs} args - Arguments to update many Movies.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movies and only return the `id`
     * const movieWithIdOnly = await prisma.movie.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovieUpdateManyAndReturnArgs>(args: SelectSubset<T, MovieUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movie.
     * @param {MovieUpsertArgs} args - Arguments to update or create a Movie.
     * @example
     * // Update or create a Movie
     * const movie = await prisma.movie.upsert({
     *   create: {
     *     // ... data to create a Movie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movie we want to update
     *   }
     * })
     */
    upsert<T extends MovieUpsertArgs>(args: SelectSubset<T, MovieUpsertArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieCountArgs} args - Arguments to filter Movies to count.
     * @example
     * // Count the number of Movies
     * const count = await prisma.movie.count({
     *   where: {
     *     // ... the filter for the Movies we want to count
     *   }
     * })
    **/
    count<T extends MovieCountArgs>(
      args?: Subset<T, MovieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovieAggregateArgs>(args: Subset<T, MovieAggregateArgs>): Prisma.PrismaPromise<GetMovieAggregateType<T>>

    /**
     * Group by Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieGroupByArgs['orderBy'] }
        : { orderBy?: MovieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Movie model
   */
  readonly fields: MovieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    watchListItems<T extends Movie$watchListItemsArgs<ExtArgs> = {}>(args?: Subset<T, Movie$watchListItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Movie model
   */
  interface MovieFieldRefs {
    readonly id: FieldRef<"Movie", 'String'>
    readonly title: FieldRef<"Movie", 'String'>
    readonly overview: FieldRef<"Movie", 'String'>
    readonly releaseYear: FieldRef<"Movie", 'Int'>
    readonly genres: FieldRef<"Movie", 'String[]'>
    readonly runtime: FieldRef<"Movie", 'Int'>
    readonly posterUrl: FieldRef<"Movie", 'String'>
    readonly createdBy: FieldRef<"Movie", 'String'>
    readonly createdAt: FieldRef<"Movie", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Movie findUnique
   */
  export type MovieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findUniqueOrThrow
   */
  export type MovieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findFirst
   */
  export type MovieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findFirstOrThrow
   */
  export type MovieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findMany
   */
  export type MovieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movies to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie create
   */
  export type MovieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to create a Movie.
     */
    data: XOR<MovieCreateInput, MovieUncheckedCreateInput>
  }

  /**
   * Movie createMany
   */
  export type MovieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movie createManyAndReturn
   */
  export type MovieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Movie update
   */
  export type MovieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to update a Movie.
     */
    data: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
    /**
     * Choose, which Movie to update.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie updateMany
   */
  export type MovieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to update.
     */
    limit?: number
  }

  /**
   * Movie updateManyAndReturn
   */
  export type MovieUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Movie upsert
   */
  export type MovieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The filter to search for the Movie to update in case it exists.
     */
    where: MovieWhereUniqueInput
    /**
     * In case the Movie found by the `where` argument doesn't exist, create a new Movie with this data.
     */
    create: XOR<MovieCreateInput, MovieUncheckedCreateInput>
    /**
     * In case the Movie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
  }

  /**
   * Movie delete
   */
  export type MovieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter which Movie to delete.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie deleteMany
   */
  export type MovieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movies to delete
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to delete.
     */
    limit?: number
  }

  /**
   * Movie.watchListItems
   */
  export type Movie$watchListItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    where?: WatchListItemWhereInput
    orderBy?: WatchListItemOrderByWithRelationInput | WatchListItemOrderByWithRelationInput[]
    cursor?: WatchListItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchListItemScalarFieldEnum | WatchListItemScalarFieldEnum[]
  }

  /**
   * Movie without action
   */
  export type MovieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
  }


  /**
   * Model WatchListItem
   */

  export type AggregateWatchListItem = {
    _count: WatchListItemCountAggregateOutputType | null
    _avg: WatchListItemAvgAggregateOutputType | null
    _sum: WatchListItemSumAggregateOutputType | null
    _min: WatchListItemMinAggregateOutputType | null
    _max: WatchListItemMaxAggregateOutputType | null
  }

  export type WatchListItemAvgAggregateOutputType = {
    rating: number | null
  }

  export type WatchListItemSumAggregateOutputType = {
    rating: number | null
  }

  export type WatchListItemMinAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: string | null
    status: $Enums.WatchListStatus | null
    rating: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WatchListItemMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: string | null
    status: $Enums.WatchListStatus | null
    rating: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WatchListItemCountAggregateOutputType = {
    id: number
    userId: number
    movieId: number
    status: number
    rating: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WatchListItemAvgAggregateInputType = {
    rating?: true
  }

  export type WatchListItemSumAggregateInputType = {
    rating?: true
  }

  export type WatchListItemMinAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    status?: true
    rating?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WatchListItemMaxAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    status?: true
    rating?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WatchListItemCountAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    status?: true
    rating?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WatchListItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchListItem to aggregate.
     */
    where?: WatchListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchListItems to fetch.
     */
    orderBy?: WatchListItemOrderByWithRelationInput | WatchListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WatchListItems
    **/
    _count?: true | WatchListItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatchListItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatchListItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchListItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchListItemMaxAggregateInputType
  }

  export type GetWatchListItemAggregateType<T extends WatchListItemAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchListItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchListItem[P]>
      : GetScalarType<T[P], AggregateWatchListItem[P]>
  }




  export type WatchListItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchListItemWhereInput
    orderBy?: WatchListItemOrderByWithAggregationInput | WatchListItemOrderByWithAggregationInput[]
    by: WatchListItemScalarFieldEnum[] | WatchListItemScalarFieldEnum
    having?: WatchListItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchListItemCountAggregateInputType | true
    _avg?: WatchListItemAvgAggregateInputType
    _sum?: WatchListItemSumAggregateInputType
    _min?: WatchListItemMinAggregateInputType
    _max?: WatchListItemMaxAggregateInputType
  }

  export type WatchListItemGroupByOutputType = {
    id: string
    userId: string
    movieId: string
    status: $Enums.WatchListStatus
    rating: number | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: WatchListItemCountAggregateOutputType | null
    _avg: WatchListItemAvgAggregateOutputType | null
    _sum: WatchListItemSumAggregateOutputType | null
    _min: WatchListItemMinAggregateOutputType | null
    _max: WatchListItemMaxAggregateOutputType | null
  }

  type GetWatchListItemGroupByPayload<T extends WatchListItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchListItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchListItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchListItemGroupByOutputType[P]>
            : GetScalarType<T[P], WatchListItemGroupByOutputType[P]>
        }
      >
    >


  export type WatchListItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchListItem"]>

  export type WatchListItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchListItem"]>

  export type WatchListItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchListItem"]>

  export type WatchListItemSelectScalar = {
    id?: boolean
    userId?: boolean
    movieId?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WatchListItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "movieId" | "status" | "rating" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["watchListItem"]>
  export type WatchListItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }
  export type WatchListItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }
  export type WatchListItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }

  export type $WatchListItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WatchListItem"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      movie: Prisma.$MoviePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      movieId: string
      status: $Enums.WatchListStatus
      rating: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["watchListItem"]>
    composites: {}
  }

  type WatchListItemGetPayload<S extends boolean | null | undefined | WatchListItemDefaultArgs> = $Result.GetResult<Prisma.$WatchListItemPayload, S>

  type WatchListItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WatchListItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatchListItemCountAggregateInputType | true
    }

  export interface WatchListItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WatchListItem'], meta: { name: 'WatchListItem' } }
    /**
     * Find zero or one WatchListItem that matches the filter.
     * @param {WatchListItemFindUniqueArgs} args - Arguments to find a WatchListItem
     * @example
     * // Get one WatchListItem
     * const watchListItem = await prisma.watchListItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchListItemFindUniqueArgs>(args: SelectSubset<T, WatchListItemFindUniqueArgs<ExtArgs>>): Prisma__WatchListItemClient<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WatchListItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchListItemFindUniqueOrThrowArgs} args - Arguments to find a WatchListItem
     * @example
     * // Get one WatchListItem
     * const watchListItem = await prisma.watchListItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchListItemFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchListItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchListItemClient<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WatchListItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchListItemFindFirstArgs} args - Arguments to find a WatchListItem
     * @example
     * // Get one WatchListItem
     * const watchListItem = await prisma.watchListItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchListItemFindFirstArgs>(args?: SelectSubset<T, WatchListItemFindFirstArgs<ExtArgs>>): Prisma__WatchListItemClient<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WatchListItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchListItemFindFirstOrThrowArgs} args - Arguments to find a WatchListItem
     * @example
     * // Get one WatchListItem
     * const watchListItem = await prisma.watchListItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchListItemFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchListItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchListItemClient<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WatchListItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchListItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WatchListItems
     * const watchListItems = await prisma.watchListItem.findMany()
     * 
     * // Get first 10 WatchListItems
     * const watchListItems = await prisma.watchListItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchListItemWithIdOnly = await prisma.watchListItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchListItemFindManyArgs>(args?: SelectSubset<T, WatchListItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WatchListItem.
     * @param {WatchListItemCreateArgs} args - Arguments to create a WatchListItem.
     * @example
     * // Create one WatchListItem
     * const WatchListItem = await prisma.watchListItem.create({
     *   data: {
     *     // ... data to create a WatchListItem
     *   }
     * })
     * 
     */
    create<T extends WatchListItemCreateArgs>(args: SelectSubset<T, WatchListItemCreateArgs<ExtArgs>>): Prisma__WatchListItemClient<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WatchListItems.
     * @param {WatchListItemCreateManyArgs} args - Arguments to create many WatchListItems.
     * @example
     * // Create many WatchListItems
     * const watchListItem = await prisma.watchListItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchListItemCreateManyArgs>(args?: SelectSubset<T, WatchListItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WatchListItems and returns the data saved in the database.
     * @param {WatchListItemCreateManyAndReturnArgs} args - Arguments to create many WatchListItems.
     * @example
     * // Create many WatchListItems
     * const watchListItem = await prisma.watchListItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WatchListItems and only return the `id`
     * const watchListItemWithIdOnly = await prisma.watchListItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchListItemCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchListItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WatchListItem.
     * @param {WatchListItemDeleteArgs} args - Arguments to delete one WatchListItem.
     * @example
     * // Delete one WatchListItem
     * const WatchListItem = await prisma.watchListItem.delete({
     *   where: {
     *     // ... filter to delete one WatchListItem
     *   }
     * })
     * 
     */
    delete<T extends WatchListItemDeleteArgs>(args: SelectSubset<T, WatchListItemDeleteArgs<ExtArgs>>): Prisma__WatchListItemClient<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WatchListItem.
     * @param {WatchListItemUpdateArgs} args - Arguments to update one WatchListItem.
     * @example
     * // Update one WatchListItem
     * const watchListItem = await prisma.watchListItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchListItemUpdateArgs>(args: SelectSubset<T, WatchListItemUpdateArgs<ExtArgs>>): Prisma__WatchListItemClient<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WatchListItems.
     * @param {WatchListItemDeleteManyArgs} args - Arguments to filter WatchListItems to delete.
     * @example
     * // Delete a few WatchListItems
     * const { count } = await prisma.watchListItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchListItemDeleteManyArgs>(args?: SelectSubset<T, WatchListItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchListItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchListItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WatchListItems
     * const watchListItem = await prisma.watchListItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchListItemUpdateManyArgs>(args: SelectSubset<T, WatchListItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchListItems and returns the data updated in the database.
     * @param {WatchListItemUpdateManyAndReturnArgs} args - Arguments to update many WatchListItems.
     * @example
     * // Update many WatchListItems
     * const watchListItem = await prisma.watchListItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WatchListItems and only return the `id`
     * const watchListItemWithIdOnly = await prisma.watchListItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WatchListItemUpdateManyAndReturnArgs>(args: SelectSubset<T, WatchListItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WatchListItem.
     * @param {WatchListItemUpsertArgs} args - Arguments to update or create a WatchListItem.
     * @example
     * // Update or create a WatchListItem
     * const watchListItem = await prisma.watchListItem.upsert({
     *   create: {
     *     // ... data to create a WatchListItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WatchListItem we want to update
     *   }
     * })
     */
    upsert<T extends WatchListItemUpsertArgs>(args: SelectSubset<T, WatchListItemUpsertArgs<ExtArgs>>): Prisma__WatchListItemClient<$Result.GetResult<Prisma.$WatchListItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WatchListItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchListItemCountArgs} args - Arguments to filter WatchListItems to count.
     * @example
     * // Count the number of WatchListItems
     * const count = await prisma.watchListItem.count({
     *   where: {
     *     // ... the filter for the WatchListItems we want to count
     *   }
     * })
    **/
    count<T extends WatchListItemCountArgs>(
      args?: Subset<T, WatchListItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchListItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WatchListItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchListItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchListItemAggregateArgs>(args: Subset<T, WatchListItemAggregateArgs>): Prisma.PrismaPromise<GetWatchListItemAggregateType<T>>

    /**
     * Group by WatchListItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchListItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchListItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchListItemGroupByArgs['orderBy'] }
        : { orderBy?: WatchListItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchListItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchListItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WatchListItem model
   */
  readonly fields: WatchListItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WatchListItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchListItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    movie<T extends MovieDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MovieDefaultArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WatchListItem model
   */
  interface WatchListItemFieldRefs {
    readonly id: FieldRef<"WatchListItem", 'String'>
    readonly userId: FieldRef<"WatchListItem", 'String'>
    readonly movieId: FieldRef<"WatchListItem", 'String'>
    readonly status: FieldRef<"WatchListItem", 'WatchListStatus'>
    readonly rating: FieldRef<"WatchListItem", 'Int'>
    readonly notes: FieldRef<"WatchListItem", 'String'>
    readonly createdAt: FieldRef<"WatchListItem", 'DateTime'>
    readonly updatedAt: FieldRef<"WatchListItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WatchListItem findUnique
   */
  export type WatchListItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchListItem to fetch.
     */
    where: WatchListItemWhereUniqueInput
  }

  /**
   * WatchListItem findUniqueOrThrow
   */
  export type WatchListItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchListItem to fetch.
     */
    where: WatchListItemWhereUniqueInput
  }

  /**
   * WatchListItem findFirst
   */
  export type WatchListItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchListItem to fetch.
     */
    where?: WatchListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchListItems to fetch.
     */
    orderBy?: WatchListItemOrderByWithRelationInput | WatchListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchListItems.
     */
    cursor?: WatchListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchListItems.
     */
    distinct?: WatchListItemScalarFieldEnum | WatchListItemScalarFieldEnum[]
  }

  /**
   * WatchListItem findFirstOrThrow
   */
  export type WatchListItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchListItem to fetch.
     */
    where?: WatchListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchListItems to fetch.
     */
    orderBy?: WatchListItemOrderByWithRelationInput | WatchListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchListItems.
     */
    cursor?: WatchListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchListItems.
     */
    distinct?: WatchListItemScalarFieldEnum | WatchListItemScalarFieldEnum[]
  }

  /**
   * WatchListItem findMany
   */
  export type WatchListItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchListItems to fetch.
     */
    where?: WatchListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchListItems to fetch.
     */
    orderBy?: WatchListItemOrderByWithRelationInput | WatchListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WatchListItems.
     */
    cursor?: WatchListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchListItems.
     */
    distinct?: WatchListItemScalarFieldEnum | WatchListItemScalarFieldEnum[]
  }

  /**
   * WatchListItem create
   */
  export type WatchListItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * The data needed to create a WatchListItem.
     */
    data: XOR<WatchListItemCreateInput, WatchListItemUncheckedCreateInput>
  }

  /**
   * WatchListItem createMany
   */
  export type WatchListItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WatchListItems.
     */
    data: WatchListItemCreateManyInput | WatchListItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WatchListItem createManyAndReturn
   */
  export type WatchListItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * The data used to create many WatchListItems.
     */
    data: WatchListItemCreateManyInput | WatchListItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchListItem update
   */
  export type WatchListItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * The data needed to update a WatchListItem.
     */
    data: XOR<WatchListItemUpdateInput, WatchListItemUncheckedUpdateInput>
    /**
     * Choose, which WatchListItem to update.
     */
    where: WatchListItemWhereUniqueInput
  }

  /**
   * WatchListItem updateMany
   */
  export type WatchListItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WatchListItems.
     */
    data: XOR<WatchListItemUpdateManyMutationInput, WatchListItemUncheckedUpdateManyInput>
    /**
     * Filter which WatchListItems to update
     */
    where?: WatchListItemWhereInput
    /**
     * Limit how many WatchListItems to update.
     */
    limit?: number
  }

  /**
   * WatchListItem updateManyAndReturn
   */
  export type WatchListItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * The data used to update WatchListItems.
     */
    data: XOR<WatchListItemUpdateManyMutationInput, WatchListItemUncheckedUpdateManyInput>
    /**
     * Filter which WatchListItems to update
     */
    where?: WatchListItemWhereInput
    /**
     * Limit how many WatchListItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchListItem upsert
   */
  export type WatchListItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * The filter to search for the WatchListItem to update in case it exists.
     */
    where: WatchListItemWhereUniqueInput
    /**
     * In case the WatchListItem found by the `where` argument doesn't exist, create a new WatchListItem with this data.
     */
    create: XOR<WatchListItemCreateInput, WatchListItemUncheckedCreateInput>
    /**
     * In case the WatchListItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchListItemUpdateInput, WatchListItemUncheckedUpdateInput>
  }

  /**
   * WatchListItem delete
   */
  export type WatchListItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
    /**
     * Filter which WatchListItem to delete.
     */
    where: WatchListItemWhereUniqueInput
  }

  /**
   * WatchListItem deleteMany
   */
  export type WatchListItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchListItems to delete
     */
    where?: WatchListItemWhereInput
    /**
     * Limit how many WatchListItems to delete.
     */
    limit?: number
  }

  /**
   * WatchListItem without action
   */
  export type WatchListItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchListItem
     */
    select?: WatchListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchListItem
     */
    omit?: WatchListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchListItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MovieScalarFieldEnum: {
    id: 'id',
    title: 'title',
    overview: 'overview',
    releaseYear: 'releaseYear',
    genres: 'genres',
    runtime: 'runtime',
    posterUrl: 'posterUrl',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type MovieScalarFieldEnum = (typeof MovieScalarFieldEnum)[keyof typeof MovieScalarFieldEnum]


  export const WatchListItemScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    movieId: 'movieId',
    status: 'status',
    rating: 'rating',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WatchListItemScalarFieldEnum = (typeof WatchListItemScalarFieldEnum)[keyof typeof WatchListItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'WatchListStatus'
   */
  export type EnumWatchListStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WatchListStatus'>
    


  /**
   * Reference to a field of type 'WatchListStatus[]'
   */
  export type ListEnumWatchListStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WatchListStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    movies?: MovieListRelationFilter
    watchListItems?: WatchListItemListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    movies?: MovieOrderByRelationAggregateInput
    watchListItems?: WatchListItemOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    movies?: MovieListRelationFilter
    watchListItems?: WatchListItemListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MovieWhereInput = {
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    id?: StringFilter<"Movie"> | string
    title?: StringFilter<"Movie"> | string
    overview?: StringNullableFilter<"Movie"> | string | null
    releaseYear?: IntFilter<"Movie"> | number
    genres?: StringNullableListFilter<"Movie">
    runtime?: IntNullableFilter<"Movie"> | number | null
    posterUrl?: StringNullableFilter<"Movie"> | string | null
    createdBy?: StringFilter<"Movie"> | string
    createdAt?: DateTimeFilter<"Movie"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    watchListItems?: WatchListItemListRelationFilter
  }

  export type MovieOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    overview?: SortOrderInput | SortOrder
    releaseYear?: SortOrder
    genres?: SortOrder
    runtime?: SortOrderInput | SortOrder
    posterUrl?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    watchListItems?: WatchListItemOrderByRelationAggregateInput
  }

  export type MovieWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    title?: StringFilter<"Movie"> | string
    overview?: StringNullableFilter<"Movie"> | string | null
    releaseYear?: IntFilter<"Movie"> | number
    genres?: StringNullableListFilter<"Movie">
    runtime?: IntNullableFilter<"Movie"> | number | null
    posterUrl?: StringNullableFilter<"Movie"> | string | null
    createdBy?: StringFilter<"Movie"> | string
    createdAt?: DateTimeFilter<"Movie"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    watchListItems?: WatchListItemListRelationFilter
  }, "id">

  export type MovieOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    overview?: SortOrderInput | SortOrder
    releaseYear?: SortOrder
    genres?: SortOrder
    runtime?: SortOrderInput | SortOrder
    posterUrl?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: MovieCountOrderByAggregateInput
    _avg?: MovieAvgOrderByAggregateInput
    _max?: MovieMaxOrderByAggregateInput
    _min?: MovieMinOrderByAggregateInput
    _sum?: MovieSumOrderByAggregateInput
  }

  export type MovieScalarWhereWithAggregatesInput = {
    AND?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    OR?: MovieScalarWhereWithAggregatesInput[]
    NOT?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Movie"> | string
    title?: StringWithAggregatesFilter<"Movie"> | string
    overview?: StringNullableWithAggregatesFilter<"Movie"> | string | null
    releaseYear?: IntWithAggregatesFilter<"Movie"> | number
    genres?: StringNullableListFilter<"Movie">
    runtime?: IntNullableWithAggregatesFilter<"Movie"> | number | null
    posterUrl?: StringNullableWithAggregatesFilter<"Movie"> | string | null
    createdBy?: StringWithAggregatesFilter<"Movie"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Movie"> | Date | string
  }

  export type WatchListItemWhereInput = {
    AND?: WatchListItemWhereInput | WatchListItemWhereInput[]
    OR?: WatchListItemWhereInput[]
    NOT?: WatchListItemWhereInput | WatchListItemWhereInput[]
    id?: StringFilter<"WatchListItem"> | string
    userId?: StringFilter<"WatchListItem"> | string
    movieId?: StringFilter<"WatchListItem"> | string
    status?: EnumWatchListStatusFilter<"WatchListItem"> | $Enums.WatchListStatus
    rating?: IntNullableFilter<"WatchListItem"> | number | null
    notes?: StringNullableFilter<"WatchListItem"> | string | null
    createdAt?: DateTimeFilter<"WatchListItem"> | Date | string
    updatedAt?: DateTimeFilter<"WatchListItem"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
  }

  export type WatchListItemOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    movie?: MovieOrderByWithRelationInput
  }

  export type WatchListItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_movieId?: WatchListItemUserIdMovieIdCompoundUniqueInput
    AND?: WatchListItemWhereInput | WatchListItemWhereInput[]
    OR?: WatchListItemWhereInput[]
    NOT?: WatchListItemWhereInput | WatchListItemWhereInput[]
    userId?: StringFilter<"WatchListItem"> | string
    movieId?: StringFilter<"WatchListItem"> | string
    status?: EnumWatchListStatusFilter<"WatchListItem"> | $Enums.WatchListStatus
    rating?: IntNullableFilter<"WatchListItem"> | number | null
    notes?: StringNullableFilter<"WatchListItem"> | string | null
    createdAt?: DateTimeFilter<"WatchListItem"> | Date | string
    updatedAt?: DateTimeFilter<"WatchListItem"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
  }, "id" | "userId_movieId">

  export type WatchListItemOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WatchListItemCountOrderByAggregateInput
    _avg?: WatchListItemAvgOrderByAggregateInput
    _max?: WatchListItemMaxOrderByAggregateInput
    _min?: WatchListItemMinOrderByAggregateInput
    _sum?: WatchListItemSumOrderByAggregateInput
  }

  export type WatchListItemScalarWhereWithAggregatesInput = {
    AND?: WatchListItemScalarWhereWithAggregatesInput | WatchListItemScalarWhereWithAggregatesInput[]
    OR?: WatchListItemScalarWhereWithAggregatesInput[]
    NOT?: WatchListItemScalarWhereWithAggregatesInput | WatchListItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WatchListItem"> | string
    userId?: StringWithAggregatesFilter<"WatchListItem"> | string
    movieId?: StringWithAggregatesFilter<"WatchListItem"> | string
    status?: EnumWatchListStatusWithAggregatesFilter<"WatchListItem"> | $Enums.WatchListStatus
    rating?: IntNullableWithAggregatesFilter<"WatchListItem"> | number | null
    notes?: StringNullableWithAggregatesFilter<"WatchListItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WatchListItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WatchListItem"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    movies?: MovieCreateNestedManyWithoutCreatorInput
    watchListItems?: WatchListItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    movies?: MovieUncheckedCreateNestedManyWithoutCreatorInput
    watchListItems?: WatchListItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movies?: MovieUpdateManyWithoutCreatorNestedInput
    watchListItems?: WatchListItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movies?: MovieUncheckedUpdateManyWithoutCreatorNestedInput
    watchListItems?: WatchListItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovieCreateInput = {
    id?: string
    title: string
    overview?: string | null
    releaseYear: number
    genres?: MovieCreategenresInput | string[]
    runtime?: number | null
    posterUrl?: string | null
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutMoviesInput
    watchListItems?: WatchListItemCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateInput = {
    id?: string
    title: string
    overview?: string | null
    releaseYear: number
    genres?: MovieCreategenresInput | string[]
    runtime?: number | null
    posterUrl?: string | null
    createdBy: string
    createdAt?: Date | string
    watchListItems?: WatchListItemUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutMoviesNestedInput
    watchListItems?: WatchListItemUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchListItems?: WatchListItemUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type MovieCreateManyInput = {
    id?: string
    title: string
    overview?: string | null
    releaseYear: number
    genres?: MovieCreategenresInput | string[]
    runtime?: number | null
    posterUrl?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type MovieUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovieUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchListItemCreateInput = {
    id?: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWatchListItemsInput
    movie: MovieCreateNestedOneWithoutWatchListItemsInput
  }

  export type WatchListItemUncheckedCreateInput = {
    id?: string
    userId: string
    movieId: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchListItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchListItemsNestedInput
    movie?: MovieUpdateOneRequiredWithoutWatchListItemsNestedInput
  }

  export type WatchListItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchListItemCreateManyInput = {
    id?: string
    userId: string
    movieId: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchListItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchListItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MovieListRelationFilter = {
    every?: MovieWhereInput
    some?: MovieWhereInput
    none?: MovieWhereInput
  }

  export type WatchListItemListRelationFilter = {
    every?: WatchListItemWhereInput
    some?: WatchListItemWhereInput
    none?: WatchListItemWhereInput
  }

  export type MovieOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchListItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MovieCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    overview?: SortOrder
    releaseYear?: SortOrder
    genres?: SortOrder
    runtime?: SortOrder
    posterUrl?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type MovieAvgOrderByAggregateInput = {
    releaseYear?: SortOrder
    runtime?: SortOrder
  }

  export type MovieMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    overview?: SortOrder
    releaseYear?: SortOrder
    runtime?: SortOrder
    posterUrl?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type MovieMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    overview?: SortOrder
    releaseYear?: SortOrder
    runtime?: SortOrder
    posterUrl?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type MovieSumOrderByAggregateInput = {
    releaseYear?: SortOrder
    runtime?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumWatchListStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WatchListStatus | EnumWatchListStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WatchListStatus[] | ListEnumWatchListStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WatchListStatus[] | ListEnumWatchListStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWatchListStatusFilter<$PrismaModel> | $Enums.WatchListStatus
  }

  export type MovieScalarRelationFilter = {
    is?: MovieWhereInput
    isNot?: MovieWhereInput
  }

  export type WatchListItemUserIdMovieIdCompoundUniqueInput = {
    userId: string
    movieId: string
  }

  export type WatchListItemCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchListItemAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type WatchListItemMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchListItemMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchListItemSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EnumWatchListStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WatchListStatus | EnumWatchListStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WatchListStatus[] | ListEnumWatchListStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WatchListStatus[] | ListEnumWatchListStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWatchListStatusWithAggregatesFilter<$PrismaModel> | $Enums.WatchListStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWatchListStatusFilter<$PrismaModel>
    _max?: NestedEnumWatchListStatusFilter<$PrismaModel>
  }

  export type MovieCreateNestedManyWithoutCreatorInput = {
    create?: XOR<MovieCreateWithoutCreatorInput, MovieUncheckedCreateWithoutCreatorInput> | MovieCreateWithoutCreatorInput[] | MovieUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutCreatorInput | MovieCreateOrConnectWithoutCreatorInput[]
    createMany?: MovieCreateManyCreatorInputEnvelope
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type WatchListItemCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchListItemCreateWithoutUserInput, WatchListItemUncheckedCreateWithoutUserInput> | WatchListItemCreateWithoutUserInput[] | WatchListItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchListItemCreateOrConnectWithoutUserInput | WatchListItemCreateOrConnectWithoutUserInput[]
    createMany?: WatchListItemCreateManyUserInputEnvelope
    connect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<MovieCreateWithoutCreatorInput, MovieUncheckedCreateWithoutCreatorInput> | MovieCreateWithoutCreatorInput[] | MovieUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutCreatorInput | MovieCreateOrConnectWithoutCreatorInput[]
    createMany?: MovieCreateManyCreatorInputEnvelope
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type WatchListItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchListItemCreateWithoutUserInput, WatchListItemUncheckedCreateWithoutUserInput> | WatchListItemCreateWithoutUserInput[] | WatchListItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchListItemCreateOrConnectWithoutUserInput | WatchListItemCreateOrConnectWithoutUserInput[]
    createMany?: WatchListItemCreateManyUserInputEnvelope
    connect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MovieUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<MovieCreateWithoutCreatorInput, MovieUncheckedCreateWithoutCreatorInput> | MovieCreateWithoutCreatorInput[] | MovieUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutCreatorInput | MovieCreateOrConnectWithoutCreatorInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutCreatorInput | MovieUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: MovieCreateManyCreatorInputEnvelope
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutCreatorInput | MovieUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutCreatorInput | MovieUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type WatchListItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchListItemCreateWithoutUserInput, WatchListItemUncheckedCreateWithoutUserInput> | WatchListItemCreateWithoutUserInput[] | WatchListItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchListItemCreateOrConnectWithoutUserInput | WatchListItemCreateOrConnectWithoutUserInput[]
    upsert?: WatchListItemUpsertWithWhereUniqueWithoutUserInput | WatchListItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchListItemCreateManyUserInputEnvelope
    set?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    disconnect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    delete?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    connect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    update?: WatchListItemUpdateWithWhereUniqueWithoutUserInput | WatchListItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchListItemUpdateManyWithWhereWithoutUserInput | WatchListItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchListItemScalarWhereInput | WatchListItemScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<MovieCreateWithoutCreatorInput, MovieUncheckedCreateWithoutCreatorInput> | MovieCreateWithoutCreatorInput[] | MovieUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutCreatorInput | MovieCreateOrConnectWithoutCreatorInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutCreatorInput | MovieUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: MovieCreateManyCreatorInputEnvelope
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutCreatorInput | MovieUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutCreatorInput | MovieUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type WatchListItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchListItemCreateWithoutUserInput, WatchListItemUncheckedCreateWithoutUserInput> | WatchListItemCreateWithoutUserInput[] | WatchListItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchListItemCreateOrConnectWithoutUserInput | WatchListItemCreateOrConnectWithoutUserInput[]
    upsert?: WatchListItemUpsertWithWhereUniqueWithoutUserInput | WatchListItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchListItemCreateManyUserInputEnvelope
    set?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    disconnect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    delete?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    connect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    update?: WatchListItemUpdateWithWhereUniqueWithoutUserInput | WatchListItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchListItemUpdateManyWithWhereWithoutUserInput | WatchListItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchListItemScalarWhereInput | WatchListItemScalarWhereInput[]
  }

  export type MovieCreategenresInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMoviesInput = {
    create?: XOR<UserCreateWithoutMoviesInput, UserUncheckedCreateWithoutMoviesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMoviesInput
    connect?: UserWhereUniqueInput
  }

  export type WatchListItemCreateNestedManyWithoutMovieInput = {
    create?: XOR<WatchListItemCreateWithoutMovieInput, WatchListItemUncheckedCreateWithoutMovieInput> | WatchListItemCreateWithoutMovieInput[] | WatchListItemUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchListItemCreateOrConnectWithoutMovieInput | WatchListItemCreateOrConnectWithoutMovieInput[]
    createMany?: WatchListItemCreateManyMovieInputEnvelope
    connect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
  }

  export type WatchListItemUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<WatchListItemCreateWithoutMovieInput, WatchListItemUncheckedCreateWithoutMovieInput> | WatchListItemCreateWithoutMovieInput[] | WatchListItemUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchListItemCreateOrConnectWithoutMovieInput | WatchListItemCreateOrConnectWithoutMovieInput[]
    createMany?: WatchListItemCreateManyMovieInputEnvelope
    connect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MovieUpdategenresInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutMoviesNestedInput = {
    create?: XOR<UserCreateWithoutMoviesInput, UserUncheckedCreateWithoutMoviesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMoviesInput
    upsert?: UserUpsertWithoutMoviesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMoviesInput, UserUpdateWithoutMoviesInput>, UserUncheckedUpdateWithoutMoviesInput>
  }

  export type WatchListItemUpdateManyWithoutMovieNestedInput = {
    create?: XOR<WatchListItemCreateWithoutMovieInput, WatchListItemUncheckedCreateWithoutMovieInput> | WatchListItemCreateWithoutMovieInput[] | WatchListItemUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchListItemCreateOrConnectWithoutMovieInput | WatchListItemCreateOrConnectWithoutMovieInput[]
    upsert?: WatchListItemUpsertWithWhereUniqueWithoutMovieInput | WatchListItemUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: WatchListItemCreateManyMovieInputEnvelope
    set?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    disconnect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    delete?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    connect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    update?: WatchListItemUpdateWithWhereUniqueWithoutMovieInput | WatchListItemUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: WatchListItemUpdateManyWithWhereWithoutMovieInput | WatchListItemUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: WatchListItemScalarWhereInput | WatchListItemScalarWhereInput[]
  }

  export type WatchListItemUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<WatchListItemCreateWithoutMovieInput, WatchListItemUncheckedCreateWithoutMovieInput> | WatchListItemCreateWithoutMovieInput[] | WatchListItemUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchListItemCreateOrConnectWithoutMovieInput | WatchListItemCreateOrConnectWithoutMovieInput[]
    upsert?: WatchListItemUpsertWithWhereUniqueWithoutMovieInput | WatchListItemUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: WatchListItemCreateManyMovieInputEnvelope
    set?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    disconnect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    delete?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    connect?: WatchListItemWhereUniqueInput | WatchListItemWhereUniqueInput[]
    update?: WatchListItemUpdateWithWhereUniqueWithoutMovieInput | WatchListItemUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: WatchListItemUpdateManyWithWhereWithoutMovieInput | WatchListItemUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: WatchListItemScalarWhereInput | WatchListItemScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWatchListItemsInput = {
    create?: XOR<UserCreateWithoutWatchListItemsInput, UserUncheckedCreateWithoutWatchListItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchListItemsInput
    connect?: UserWhereUniqueInput
  }

  export type MovieCreateNestedOneWithoutWatchListItemsInput = {
    create?: XOR<MovieCreateWithoutWatchListItemsInput, MovieUncheckedCreateWithoutWatchListItemsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutWatchListItemsInput
    connect?: MovieWhereUniqueInput
  }

  export type EnumWatchListStatusFieldUpdateOperationsInput = {
    set?: $Enums.WatchListStatus
  }

  export type UserUpdateOneRequiredWithoutWatchListItemsNestedInput = {
    create?: XOR<UserCreateWithoutWatchListItemsInput, UserUncheckedCreateWithoutWatchListItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchListItemsInput
    upsert?: UserUpsertWithoutWatchListItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchListItemsInput, UserUpdateWithoutWatchListItemsInput>, UserUncheckedUpdateWithoutWatchListItemsInput>
  }

  export type MovieUpdateOneRequiredWithoutWatchListItemsNestedInput = {
    create?: XOR<MovieCreateWithoutWatchListItemsInput, MovieUncheckedCreateWithoutWatchListItemsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutWatchListItemsInput
    upsert?: MovieUpsertWithoutWatchListItemsInput
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutWatchListItemsInput, MovieUpdateWithoutWatchListItemsInput>, MovieUncheckedUpdateWithoutWatchListItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumWatchListStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WatchListStatus | EnumWatchListStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WatchListStatus[] | ListEnumWatchListStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WatchListStatus[] | ListEnumWatchListStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWatchListStatusFilter<$PrismaModel> | $Enums.WatchListStatus
  }

  export type NestedEnumWatchListStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WatchListStatus | EnumWatchListStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WatchListStatus[] | ListEnumWatchListStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WatchListStatus[] | ListEnumWatchListStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWatchListStatusWithAggregatesFilter<$PrismaModel> | $Enums.WatchListStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWatchListStatusFilter<$PrismaModel>
    _max?: NestedEnumWatchListStatusFilter<$PrismaModel>
  }

  export type MovieCreateWithoutCreatorInput = {
    id?: string
    title: string
    overview?: string | null
    releaseYear: number
    genres?: MovieCreategenresInput | string[]
    runtime?: number | null
    posterUrl?: string | null
    createdAt?: Date | string
    watchListItems?: WatchListItemCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateWithoutCreatorInput = {
    id?: string
    title: string
    overview?: string | null
    releaseYear: number
    genres?: MovieCreategenresInput | string[]
    runtime?: number | null
    posterUrl?: string | null
    createdAt?: Date | string
    watchListItems?: WatchListItemUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieCreateOrConnectWithoutCreatorInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutCreatorInput, MovieUncheckedCreateWithoutCreatorInput>
  }

  export type MovieCreateManyCreatorInputEnvelope = {
    data: MovieCreateManyCreatorInput | MovieCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type WatchListItemCreateWithoutUserInput = {
    id?: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    movie: MovieCreateNestedOneWithoutWatchListItemsInput
  }

  export type WatchListItemUncheckedCreateWithoutUserInput = {
    id?: string
    movieId: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchListItemCreateOrConnectWithoutUserInput = {
    where: WatchListItemWhereUniqueInput
    create: XOR<WatchListItemCreateWithoutUserInput, WatchListItemUncheckedCreateWithoutUserInput>
  }

  export type WatchListItemCreateManyUserInputEnvelope = {
    data: WatchListItemCreateManyUserInput | WatchListItemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MovieUpsertWithWhereUniqueWithoutCreatorInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutCreatorInput, MovieUncheckedUpdateWithoutCreatorInput>
    create: XOR<MovieCreateWithoutCreatorInput, MovieUncheckedCreateWithoutCreatorInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutCreatorInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutCreatorInput, MovieUncheckedUpdateWithoutCreatorInput>
  }

  export type MovieUpdateManyWithWhereWithoutCreatorInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutCreatorInput>
  }

  export type MovieScalarWhereInput = {
    AND?: MovieScalarWhereInput | MovieScalarWhereInput[]
    OR?: MovieScalarWhereInput[]
    NOT?: MovieScalarWhereInput | MovieScalarWhereInput[]
    id?: StringFilter<"Movie"> | string
    title?: StringFilter<"Movie"> | string
    overview?: StringNullableFilter<"Movie"> | string | null
    releaseYear?: IntFilter<"Movie"> | number
    genres?: StringNullableListFilter<"Movie">
    runtime?: IntNullableFilter<"Movie"> | number | null
    posterUrl?: StringNullableFilter<"Movie"> | string | null
    createdBy?: StringFilter<"Movie"> | string
    createdAt?: DateTimeFilter<"Movie"> | Date | string
  }

  export type WatchListItemUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchListItemWhereUniqueInput
    update: XOR<WatchListItemUpdateWithoutUserInput, WatchListItemUncheckedUpdateWithoutUserInput>
    create: XOR<WatchListItemCreateWithoutUserInput, WatchListItemUncheckedCreateWithoutUserInput>
  }

  export type WatchListItemUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchListItemWhereUniqueInput
    data: XOR<WatchListItemUpdateWithoutUserInput, WatchListItemUncheckedUpdateWithoutUserInput>
  }

  export type WatchListItemUpdateManyWithWhereWithoutUserInput = {
    where: WatchListItemScalarWhereInput
    data: XOR<WatchListItemUpdateManyMutationInput, WatchListItemUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchListItemScalarWhereInput = {
    AND?: WatchListItemScalarWhereInput | WatchListItemScalarWhereInput[]
    OR?: WatchListItemScalarWhereInput[]
    NOT?: WatchListItemScalarWhereInput | WatchListItemScalarWhereInput[]
    id?: StringFilter<"WatchListItem"> | string
    userId?: StringFilter<"WatchListItem"> | string
    movieId?: StringFilter<"WatchListItem"> | string
    status?: EnumWatchListStatusFilter<"WatchListItem"> | $Enums.WatchListStatus
    rating?: IntNullableFilter<"WatchListItem"> | number | null
    notes?: StringNullableFilter<"WatchListItem"> | string | null
    createdAt?: DateTimeFilter<"WatchListItem"> | Date | string
    updatedAt?: DateTimeFilter<"WatchListItem"> | Date | string
  }

  export type UserCreateWithoutMoviesInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    watchListItems?: WatchListItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMoviesInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    watchListItems?: WatchListItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMoviesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMoviesInput, UserUncheckedCreateWithoutMoviesInput>
  }

  export type WatchListItemCreateWithoutMovieInput = {
    id?: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWatchListItemsInput
  }

  export type WatchListItemUncheckedCreateWithoutMovieInput = {
    id?: string
    userId: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchListItemCreateOrConnectWithoutMovieInput = {
    where: WatchListItemWhereUniqueInput
    create: XOR<WatchListItemCreateWithoutMovieInput, WatchListItemUncheckedCreateWithoutMovieInput>
  }

  export type WatchListItemCreateManyMovieInputEnvelope = {
    data: WatchListItemCreateManyMovieInput | WatchListItemCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMoviesInput = {
    update: XOR<UserUpdateWithoutMoviesInput, UserUncheckedUpdateWithoutMoviesInput>
    create: XOR<UserCreateWithoutMoviesInput, UserUncheckedCreateWithoutMoviesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMoviesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMoviesInput, UserUncheckedUpdateWithoutMoviesInput>
  }

  export type UserUpdateWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchListItems?: WatchListItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchListItems?: WatchListItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WatchListItemUpsertWithWhereUniqueWithoutMovieInput = {
    where: WatchListItemWhereUniqueInput
    update: XOR<WatchListItemUpdateWithoutMovieInput, WatchListItemUncheckedUpdateWithoutMovieInput>
    create: XOR<WatchListItemCreateWithoutMovieInput, WatchListItemUncheckedCreateWithoutMovieInput>
  }

  export type WatchListItemUpdateWithWhereUniqueWithoutMovieInput = {
    where: WatchListItemWhereUniqueInput
    data: XOR<WatchListItemUpdateWithoutMovieInput, WatchListItemUncheckedUpdateWithoutMovieInput>
  }

  export type WatchListItemUpdateManyWithWhereWithoutMovieInput = {
    where: WatchListItemScalarWhereInput
    data: XOR<WatchListItemUpdateManyMutationInput, WatchListItemUncheckedUpdateManyWithoutMovieInput>
  }

  export type UserCreateWithoutWatchListItemsInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    movies?: MovieCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutWatchListItemsInput = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date | string
    movies?: MovieUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutWatchListItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchListItemsInput, UserUncheckedCreateWithoutWatchListItemsInput>
  }

  export type MovieCreateWithoutWatchListItemsInput = {
    id?: string
    title: string
    overview?: string | null
    releaseYear: number
    genres?: MovieCreategenresInput | string[]
    runtime?: number | null
    posterUrl?: string | null
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutMoviesInput
  }

  export type MovieUncheckedCreateWithoutWatchListItemsInput = {
    id?: string
    title: string
    overview?: string | null
    releaseYear: number
    genres?: MovieCreategenresInput | string[]
    runtime?: number | null
    posterUrl?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type MovieCreateOrConnectWithoutWatchListItemsInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutWatchListItemsInput, MovieUncheckedCreateWithoutWatchListItemsInput>
  }

  export type UserUpsertWithoutWatchListItemsInput = {
    update: XOR<UserUpdateWithoutWatchListItemsInput, UserUncheckedUpdateWithoutWatchListItemsInput>
    create: XOR<UserCreateWithoutWatchListItemsInput, UserUncheckedCreateWithoutWatchListItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchListItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchListItemsInput, UserUncheckedUpdateWithoutWatchListItemsInput>
  }

  export type UserUpdateWithoutWatchListItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movies?: MovieUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchListItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movies?: MovieUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type MovieUpsertWithoutWatchListItemsInput = {
    update: XOR<MovieUpdateWithoutWatchListItemsInput, MovieUncheckedUpdateWithoutWatchListItemsInput>
    create: XOR<MovieCreateWithoutWatchListItemsInput, MovieUncheckedCreateWithoutWatchListItemsInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutWatchListItemsInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutWatchListItemsInput, MovieUncheckedUpdateWithoutWatchListItemsInput>
  }

  export type MovieUpdateWithoutWatchListItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutWatchListItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovieCreateManyCreatorInput = {
    id?: string
    title: string
    overview?: string | null
    releaseYear: number
    genres?: MovieCreategenresInput | string[]
    runtime?: number | null
    posterUrl?: string | null
    createdAt?: Date | string
  }

  export type WatchListItemCreateManyUserInput = {
    id?: string
    movieId: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovieUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchListItems?: WatchListItemUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchListItems?: WatchListItemUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    releaseYear?: IntFieldUpdateOperationsInput | number
    genres?: MovieUpdategenresInput | string[]
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    posterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchListItemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movie?: MovieUpdateOneRequiredWithoutWatchListItemsNestedInput
  }

  export type WatchListItemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchListItemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchListItemCreateManyMovieInput = {
    id?: string
    userId: string
    status?: $Enums.WatchListStatus
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchListItemUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchListItemsNestedInput
  }

  export type WatchListItemUncheckedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchListItemUncheckedUpdateManyWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumWatchListStatusFieldUpdateOperationsInput | $Enums.WatchListStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}