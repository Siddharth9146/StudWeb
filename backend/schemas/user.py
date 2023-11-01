def StudInfoSerializer(StudInfo) -> dict:
    return {
        "id": str(StudInfo['_id']),
        "name": StudInfo['name'], # "name" is the name of the student
        "tenth_grade": StudInfo['tenth_grade'],
        "twelfth_grade": StudInfo['twelfth_grade'],
        "location": StudInfo['location']
    }
def StudsInfoSerializer(StudsInfo) -> list:
    return [StudInfoSerializer(StudInfo) for StudInfo in StudsInfo]

def UniInfoSerializer(UniInfo) -> dict:
    return {
        "id": str(UniInfo['_id']),
        "name": UniInfo['name'],
        "location": UniInfo['location'],
        "qs_ranking": UniInfo['qs_ranking'],
        "nirf_ranking": UniInfo['nirf_ranking'],
        "preferred_degree": UniInfo['degrees_best']
    }

def UnisInfoSerializer(UnisInfo) -> list:
    return [UniInfoSerializer(UniInfo) for UniInfo in UnisInfo]

