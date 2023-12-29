import { Inject, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { URLParam } from '../../controllers/services/api/api.service';
import { BusinessService } from '../../controllers/services/business/business.service';
import { TipoOrdenamiento } from '../../enums/tipo-ordenamiento.enum';
import { TipoVistaListado } from '../../enums/tipo-vista-listado.enum';

interface IBaseFiltroComponent {
  endpoint?: string | URLParam;
  tipoVista?: TipoVistaListado;
  esCargaMultiple?: boolean;
  endpointsMultiple?: IMultipleMaestro[];
}

interface IMultipleMaestro {
  endpoint: string | URLParam;
  data?: any;
}
export abstract class BaseFiltroComponent<IResponse, IQuery = {}> {
  private businessService: BusinessService;

  protected readonly TipoVistaListadoType = TipoVistaListado;
  protected readonly TipoOrdenamientoType = TipoOrdenamiento;
  protected datosMaestros: IResponse;
  protected datosMaestrosCargado: boolean;
  protected seMuestranLosFiltros: boolean;
  protected fcTipoVista = new FormControl<number>(null);
  protected subscripciones: Subscription[];

  private data: IBaseFiltroComponent;

  constructor(
    private readonly injector: Injector,
    @Inject(String)
    data?: IBaseFiltroComponent
  ) {
    this.businessService = this.injector.get(BusinessService);
    this.fcTipoVista.setValue(data?.tipoVista ?? TipoVistaListado.Tabla, {
      emitEvent: false,
    });
    this.datosMaestrosCargado = false;
    this.seMuestranLosFiltros = false;
    this.data = data;
    this.subscripciones = [];
    this.cargarData();
  }

  abstract toRequest(): IQuery;
  abstract dataCargada(responses?: any[]): void;
  abstract resetear(): void;

  public cargarData() {
    if (this.data?.esCargaMultiple) {
      this.cargarMultiplesMaestros(this.data?.endpointsMultiple);
    } else {
      this.cargarMaestros(this.data?.endpoint);
    }
  }

  private async cargarMaestros(endpoint?: string | URLParam): Promise<void> {
    if (endpoint === null || endpoint === undefined) {
      this.datosMaestrosCargado = true;
      return;
    }

    this.datosMaestros = null;
    this.datosMaestrosCargado = false;

    this.datosMaestros = await this.businessService.methodGet<
      IResponse,
      IQuery
    >(endpoint, this.toRequest());
    this.datosMaestrosCargado = true;
    this.dataCargada();
  }

  private async cargarMultiplesMaestros(
    endpoints: IMultipleMaestro[]
  ): Promise<void> {
    if (endpoints === null || endpoints === undefined) {
      this.datosMaestrosCargado = true;
      return null;
    }

    this.datosMaestros = null;
    this.datosMaestrosCargado = false;

    const promisesResponse = await Promise.allSettled(
      endpoints.map((e) =>
        this.businessService.methodGet<{}, {}>(e.endpoint, e.data)
      )
    );

    if (promisesResponse.some((e) => e.status === 'rejected')) return null;

    this.datosMaestrosCargado = true;
    this.dataCargada(promisesResponse.map((e: any) => e.value));
  }
}
