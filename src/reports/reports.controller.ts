import { Controller , Post , Body , UseGuards} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { User } from 'src/users/user.entity';
@Controller('reports')
export class ReportsController {
    constructor(private reportsService:ReportsService){}
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto , @CurrentUser() user:User){   // receiving Body as body & CurrentUser as user
       return this.reportsService.create(body , user);
    }
}
