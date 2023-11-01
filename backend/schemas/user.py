def StudInfoSerializer(StudInfo) -> dict:
    return {
        "id": str(StudInfo['_id']),
        "name": StudInfo['name'], # "name" is the name of the student
        "phone": StudInfo['phone'],
        "tenth_grade": StudInfo['tenth_grade'],
        "twelfth_grade": StudInfo['twelfth_grade'],
        "state": StudInfo['state'],
        "preferred_degree": StudInfo['preferred_degree']
    }
def StudsInfoSerializer(StudsInfo) -> list:
    return [StudInfoSerializer(StudInfo) for StudInfo in StudsInfo]

def UniInfoSerializer(UniInfo) -> dict:
    return {
        "id": str(UniInfo['_id']),
        "name": str(UniInfo['name']),
        "state": str(UniInfo['state']),
        "nirf_ranking": int(UniInfo['nirf_ranking']),
        "degrees_best": str(UniInfo['degrees_best']),
        "campus_size": int(UniInfo['campus_size']),
        "facilities_score": int(UniInfo['facilities_score']),
        "required_12th": int(UniInfo['required_12th'])
    }

def UnisInfoSerializer(UnisInfo) -> list:
    return [UniInfoSerializer(UniInfo) for UniInfo in UnisInfo]

