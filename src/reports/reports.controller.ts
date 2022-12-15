import { Controller , Post , Body , UseGuards} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('reports')
export class ReportsController {
    constructor(private reportsService:ReportsService){}
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto){
       return this.reportsService.create(body);
    }
}
