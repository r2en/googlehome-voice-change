def _parallel_calculate_rank(vector):
    return rankdata(vector, method='ordinal')

class CoRanking(object):
    def __init__(self, original_data, metric='euclidean', num_cpu=multi.cpu_count()):
        self.original_data = original_data
        self.metric = metric
        self.num_cpu = num_cpu
        self.original_rank = self._calculate_rank_matrix(original_data)

    def _calculate_rank_matrix(self, data):
        distance_matrix = metrics.pairwise.pairwise_distances(data, data, metric=self.metric)

        p = Pool(self.num_cpu)
        rank_matrix = p.map(_parallel_calculate_rank, distance_matrix)
        p.close
        return np.array(rank_matrix)

    def evaluate_corank_matrix(self,  dr_data, significance=96, tolerance=70):
        self.dr_rank = self._calculate_rank_matrix(dr_data)

        difference_rank = np.absolute(self.original_rank - self.dr_rank)
        remain_tolerance = difference_rank < tolerance

        remain_significance = np.array([self.original_rank < significance, self.original_rank < significance]).any(axis=0)

        return np.sum(np.array([remain_tolerance, remain_significance]).all(axis=0)) / (significance * len(dr_data))

    def multi_evaluate_corank_matrix(self, dr_data, significance_range = range(10, 96),
                                     tolerance_range = range(10, 70)):
        self.dr_rank = self._calculate_rank_matrix(dr_data)

        difference_rank = np.absolute(self.original_rank - self.dr_rank)

        result = np.zeros((len(significance_range), len(tolerance_range)))

        for i, significance in enumerate(significance_range):
            for j, tolerance in enumerate(tolerance_range):
                remain_tolerance = difference_rank < tolerance

                remain_significance = np.array([self.original_rank < significance, self.original_rank < significance]).any(axis=0)

                result[i, j] = np.sum(np.array([remain_tolerance, remain_significance]).all(axis=0)) / (significance * len(dr_data))

        return result