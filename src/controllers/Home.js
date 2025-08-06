import { fn, col } from 'sequelize';
import Student from '../models/Student';
import Photo from '../models/Photo';
import { HTTP_STATUS } from '../constants/http';

function formatAverages(aggregationData) {
  return {
    averageAge: Number(parseFloat(aggregationData.averageAge || 0).toFixed(1)),
    averageWeight: Number(parseFloat(aggregationData.averageWeight || 0).toFixed(1)),
    averageHeight: Number(parseFloat(aggregationData.averageHeight || 0).toFixed(1)),
  };
}

async function getAggregatedStats() {
  const [totalStudents, totalPhotos, aggregationResult] = await Promise.all([
    Student.count(),
    Photo.count(),
    Student.findAll({
      attributes: [
        [fn('AVG', col('age')), 'averageAge'],
        [fn('AVG', col('weight')), 'averageWeight'],
        [fn('AVG', col('height')), 'averageHeight'],
      ],
      raw: true,
    }),
  ]);
  const aggregationData = aggregationResult[0] || {};

  return {
    totalStudents,
    totalPhotos,
    ...formatAverages(aggregationData),
  };
}

class Home {
  async index(_req, res) {
    try {
      const stats = await getAggregatedStats();

      return res.json(stats);
    } catch (e) {
      console.error('Erro no StatsController:', e);

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        errors: ['Erro ao calcular estatísticas.'],
      });
    }
  }
}

export default new Home();
